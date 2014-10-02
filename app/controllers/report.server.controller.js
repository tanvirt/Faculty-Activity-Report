'use strict';

/*
To test, go to localhost:3000/report/test
if you get "Page Not Found" error, pdf was
sucessfully generated in the app/pdf directory"
*/

var latex = require('latex');
var mongoose = require('mongoose');
var fs = require('fs');

// Require render files here
var renderTenure = require('../../app/templates/renderTenure');
var renderName = require('../../app/templates/renderName');

exports.latexString = function(req,res,next) {
	var writeable = fs.createWriteStream('./app/pdf/report.pdf');
	latex([
		'\\documentclass{article}',
		'\\begin{document}',	
		renderName.render(),
		renderTenure.render(),
		//assignedActivity.render(),
		//teachingAdvising.render(),
		//teachingEvaluation.render(),
		//dateAppointed.render(),
		'\\end{document}'
	]).pipe(writeable); //print to console for debugging
	next();
};