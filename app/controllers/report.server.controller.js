'use strict';

/*
To test, go to localhost:3000/report/test
if you get "Page Not Found" error, pdf was
sucessfully generated in the app/pdf directory"
*/

var latex = require('latex');
var mongoose = require('mongoose');
var fs = require('fs');

var async = require('async');

var path = require('path');
var join = path.join;

// Require render files here
var renderName = require('../../app/templates/name/renderName');
var renderTenure = require('../../app/templates/tenure/renderTenure');
var renderDateAppointed = require('../../app/templates/dateAppointed/renderDateAppointed');
var renderAssignedActivity = require('../../app/templates/assignedActivity/renderAssignedActivity');
var renderTeachingAdvising = require('../../app/templates/teachingAdvising/renderTeachingAdvising');
var renderTeachingAdvisingCourses = require('../../app/templates/teachingAdvisingCourses/renderTeachingAdvisingCourses');
var renderTeachingEvaluation = require('../../app/templates/teachingEvaluation/renderTeachingEvaluation');
var renderGraduateCommittee = require('../../app/templates/graduateCommittee/renderGraduateCommittee');
var renderCurrentRank = require('../../app/templates/currentRank/renderCurrentRank');
var renderCreativeWorks = require('../../app/templates/creativeWorks/renderCreativeWorks');
var renderContribution = require('../../app/templates/contribution/renderContribution');
var renderPatents = require('../../app/templates/patents/renderPatents');
var renderContracts = require('../../app/templates/contracts/renderContracts');

/*
Generates the LaTex File into app/pdf directory
*/
exports.generate = function(req,res,next) {	
	async.parallel([
		//Initiate render functions here
		renderName.render,
		renderTenure.render,
		renderCurrentRank.render,
		renderDateAppointed.render,
		renderAssignedActivity.render,
		renderTeachingAdvising.render,
		renderTeachingAdvisingCourses.render,
		renderTeachingEvaluation.render,
		renderCreativeWorks.render,
		renderPatents.render,
		renderContribution.render,
		renderContracts.render

		
	], function(err, results) {
		if (err) res.status(500).send({ error: 'Report Generation Failed' });

		//Generate Report
		var writeable = fs.createWriteStream('./app/pdf/report.pdf');

		latex([
			'\\documentclass{article}',
			'\\begin{document}',
			'\\title{COLLEGE OF ENGINEERING \\newline Annual Activities Report}',
			'\\date{}',
			'\\maketitle',
			results.join(''), //results.toString() without the ','
			'\\vspace{2in}',
			'\\begin{center}',
			'Signature', '\\line(1,0){200}', '\\hspace{2em}', 'Date', '\\line(1,0){50}',
			'\\end{center}',
			'\\end{document}'
		]).pipe(writeable).on('error', function(e) {
			throw new Error('Cannot overwrite report.pdf when it is open on your system. Please close report.pdf.');
		});
		console.log('Report Generated!');
		res.redirect('/report/download');
	});
};

exports.debug = function(req,res,next) {
	console.log('Dropped Database!');
	mongoose.connection.db.dropDatabase();
	next();
};

exports.download = function(req, res) {
	res.download('./app/pdf/report.pdf');
};

exports.form = function(req, res){
	res.render('report/test', {
	    title: 'Report Upload' 
	});
};

exports.testForm = function(req, res, next) {
	res.render('report/report', {
		title: 'Report Download'
	});
};

exports.testGenerate = function(req, res, next) {
	res.render('report/generate', {
		title: 'Generating Report'
	});
};

exports.submit = function(req, res, next) {
	async.parallel([
		async.apply(renderName.submit, req, res),
		async.apply(renderTenure.submit, req, res)
	], function(err) {
		if (err) res.status(500).send({ error: 'Submit Failed' });	
		console.log(req.body);
		res.redirect('/report/generate');	
		//next();
	});

};



