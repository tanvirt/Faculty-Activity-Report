'use strict';

var latex = require('latex');
var mongoose = require('mongoose');

var renderTenure = require('renderTenure');

exports.latexString = function() {
	return function(req,res,next) {
		latex([
			'\\documentclass{article}',
			'\\begin(document}',	
			//name(),
			renderTenure.render(),
			//assignedActivity(),
			//teachingAdvising(),
			//teachingEvaluation(),
			//dateAppointed(),
			'\\end{document}'
		]).pipe(process.stdout);
	};
};