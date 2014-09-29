'use strict';

var mongoose = require('mongoose'),
	fs = require('fs'),
	swig = require('swig'),
	mongoose = require('mongoose'),
	
	report = mongoose.model('Report'),
	name = mongoose.model('nameSchema'),
	tenure = mongoose.model('tenureSchema'),
	assignedActivity = mongoose.model('AssignedActivity'),
	teachingAdvising = mongoose.model('TeachingAdvising'),
	teachingAdvisingCourses = mongoose.model('Courses'),
	teachingEvaluation = mongoose.model('TeachingEvaluation');
	
	function renderPDF(req, res)
	{
		var text = " "; //Start document LaTeX and swig goes here

		//Functions for each section of the report
		text.concat(reportParser(req, res)); 
		text.concat(nameParser(req, res));
		text.concat(tenureParser(req, res));
		text.concat(assignedActivityParser(req, res));
		text.concat(teachingAdviseParser(req, res));
		text.concat(teachingEvaluationParser(req, res));
	
		text.concat(" "); //End docuemtn LaTeX and swig goes here
	
		return require("latex")(text);
	}
	
	/**
	* Returns the PDF filename
	*/
	exports.renderToPdfFile = function(req, res)
	{
		//TODO: Format filename to be accessible by the frontend, how to properly send data over through req or res
		var filename = (Math.random().toString().subString(2).concat('.pdf');
		var outStream = fs.createWriteStream(filename);
		renderPDF(req, res).pipe(outStream);
		return filename;	
	}
	
	
	/**
	* Returns the PDF stream
	*/
	exports.renderToPdfStream = function(req, res)
	{
		//TODO: Figure out how to properly send stream over through req or res
		return renderPDF(req, res);
	}