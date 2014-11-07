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
var renderTeachingEvaluation = require('../../app/templates/teachingEvaluation/renderTeachingEvaluation');
var renderGraduateCommittee = require('../../app/templates/graduateCommittee/renderGraduateCommittee');
var renderCurrentRank = require('../../app/templates/currentRank/renderCurrentRank');
var renderCreativeWorks = require('../../app/templates/creativeWorks/renderCreativeWorks');
var renderContribution = require('../../app/templates/contribution/renderContribution');
var renderPatents = require('../../app/templates/patents/renderPatents');
var renderContracts = require('../../app/templates/contracts/renderContracts');
var renderAffiliateAppointments = require('../../app/templates/affiliateAppointments/renderAffiliateAppointments');
var renderPublication = require('../../app/templates/publication/renderPublication');
var renderConferences = require('../../app/templates/conferences/renderConferences');
var renderGovernance = require('../../app/templates/governance/renderGovernance');
var renderConsultationsOutsideUniversity = require('../../app/templates/consultationsOutsideUniversity/renderConsultationsOutsideUniversity');
var renderEditorServiceReviewer = require('../../app/templates/editorServiceReviewer/renderEditorServiceReviewer');
var renderMembership = require('../../app/templates/membership/renderMembership');
var renderInternational = require('../../app/templates/international/renderInternational');
var renderHonors = require('../../app/templates/honors/renderHonors');
var renderFurtherInformationSection = require('../../app/templates/furtherInformationSection/renderFurtherInformationSection');
var renderServiceToSchools = require('../../app/templates/serviceToSchools/renderServiceToSchools');

/*
Generates the LaTex File into app/pdf directory
*/
exports.generate = function(req,res,next) {	
	//console.log('Req.report' + req.report._id);
	
	async.parallel([
		//Initiate render functions here
		async.apply(renderName.render, req),
		async.apply(renderTenure.render, req),
		async.apply(renderCurrentRank.render, req),
		async.apply(renderAffiliateAppointments.render, req),
		async.apply(renderDateAppointed.render, req),
		async.apply(renderTeachingAdvising.render, req),
		async.apply(renderAssignedActivity.render, req),
		async.apply(renderTeachingEvaluation.render, req),
		async.apply(renderGraduateCommittee.render, req),
		async.apply(renderCreativeWorks.render, req),
		async.apply(renderPatents.render, req),
		

		renderPublication.render,
		async.apply(renderContribution.render, req),

		async.apply(renderConferences.render, req),
		async.apply(renderContracts.render, req),
		async.apply(renderGovernance.render, req),
		async.apply(renderConsultationsOutsideUniversity.render, req),

		async.apply(renderEditorServiceReviewer.render, req),
		async.apply(renderMembership.render, req),
		async.apply(renderInternational.render, req),
		async.apply(renderServiceToSchools.render, req),
		async.apply(renderHonors.render, req),
		async.apply(renderFurtherInformationSection.render, req)	
	
	], function(err, results) {
		if (err) {
			console.log('There was an error: ' + err);
			return res.status(500).send({ error: 'Report Generation Failed' });
		}

		//Generate Report
		var writeable = fs.createWriteStream('./public/modules/reports/pdf/' + req.report._id + '.pdf');

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

		writeable.on('finish', function() {
			console.log('Report Generated!');
			next();
		});
	});
};

exports.debug = function(req,res,next) {
	console.log('Dropped Database!');
	mongoose.connection.db.dropDatabase();
	next();
};

exports.download = function(req, res) {
	console.log('Downloading');
	res.sendfile('./public/modules/reports/pdf/' + req.report._id + '.pdf');
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
		//async.apply(renderName.submit, req),
		async.apply(renderTenure.submit, req),
		async.apply(renderCurrentRank.submit, req),
		async.apply(renderAffiliateAppointments.submit, req),
		async.apply(renderDateAppointed.submit, req),
		//async.apply(renderTeachingAdvising.submit, req),
		async.apply(renderContribution.submit, req),
		//async.apply(renderInternational.submit, req),
		async.apply(renderMembership.submit, req),
		async.apply(renderConferences.submit, req),
		async.apply(renderContracts.submit, req),
		async.apply(renderConsultationsOutsideUniversity.submit, req),
		async.apply(renderGovernance.submit, req),
		async.apply(renderEditorServiceReviewer.submit, req)		

	], function(err, models) {
		if (err) return res.status(500).send({ error: 'Submit Failed' });	
		console.log(req.body);
		res.redirect('/report/generate');	
	});
};

exports.submit_02 = function(req, res, callback) {
	async.parallel({		
		name: async.apply(renderName.submit, req),
		tenure: async.apply(renderTenure.submit, req),
		currentRank: async.apply(renderCurrentRank.submit, req),
		affiliateAppointments: async.apply(renderAffiliateAppointments.submit, req),
		dateAppointed: async.apply(renderDateAppointed.submit, req),
		//teachingAdvising: async.apply(renderTeachingAdvising.submit, req),
		contribution: async.apply(renderContribution.submit, req),
		//international: async.apply(renderInternational.submit, req),
		membership: async.apply(renderMembership.submit, req),
		assignedActivity: async.apply(renderAssignedActivity.submit, req),
		teachingEvaluation: async.apply(renderTeachingEvaluation.submit, req),
		conferences: async.apply(renderConferences.submit, req),
		contracts: async.apply(renderContracts.submit, req),
		graduateCommittee: async.apply(renderGraduateCommittee.submit, req),
		creativeWorks: async.apply(renderCreativeWorks.submit, req),
		patents: async.apply(renderPatents.submit, req),
		honors: async.apply(renderHonors.submit, req),
		furtherInformationSection: async.apply(renderFurtherInformationSection.submit, req),
		serviceToSchools: async.apply(renderServiceToSchools.submit, req),
		consultationsOutsideUniversity: async.apply(renderConsultationsOutsideUniversity.submit, req),
		governance: async.apply(renderGovernance.submit, req),
		editorServiceReviewer: async.apply(renderEditorServiceReviewer.submit, req)
		
		
	}, function(err, models) {
		//console.log(require('util').inspect(req.body));
		if (err) {
			callback(err, null);	
		} else {
			callback(err, models);
		}
	});
};


