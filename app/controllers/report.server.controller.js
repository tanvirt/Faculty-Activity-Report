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

/*
Generates the LaTex File into app/pdf directory
*/
exports.latexString = function(req,res,next) {	
	async.parallel([
		//Initiate render functions here
		renderName.render,
		renderTenure.render
		
	], function(err, results) {
		if (err) return err;

		//Generate Report
		var writeable = fs.createWriteStream('./app/pdf/report.pdf');

		latex([
			'\\documentclass{article}',
			'\\begin{document}',
			'\\title{COLLEGE OF ENGINEERING \\ Annual Activities Report}',
			'\\date{}',
			'\\maketitle',
			results.join(''), //results.toString() without the ','
			'\\vspace{2in}',
			'\\begin{center}',
			'Signature', '\\line(1,0){200}', '\\hspace{1em}', 'Date', '\\line(1,0){50}',
			'\\end{center}',
			'\\end{document}'
		]).pipe(writeable).on('error', function(e) {
			throw new Error('Cannot overwrite report.pdf when it is open on your system. Please close report.pdf.');
		});
		//next();
	});

	// only for testing purposes
	res.setHeader('Content-Type', 'text/html');
	res.end('<p>Report Generated!</p>');	
	console.log('Report Generated!');	
};

