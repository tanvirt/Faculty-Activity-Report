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

// Require render files here
var renderTenure = require('../../app/templates/renderTenure');
var renderName = require('../../app/templates/renderName');

exports.latexString = function(req,res,next) {	
	async.parallel([
		//Render Name Callback
		function(callback) {
			renderName.render( function ( renderNameStr ) {
				callback(null, renderNameStr);
			});
		},
		//Render Tenure Callback
		function(callback) {
			renderTenure.render( function ( renderTenureStr ) {
				callback(null, renderTenureStr);
			});
		}
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
			results.toString(),
			'\\vspace{2in}',
			'\\begin{center}',
			'Signature', '\\line(1,0){200}', '\\hspace{1em}', 'Date', '\\line(1,0){50}',
			'\\end{center}',
			'\\end{document}'
		]).pipe(writeable);	
		
	});

	console.log('Report Generated!');

	next();
};

