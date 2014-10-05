'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var TeachingAdvisingCourses = mongoose.model('TeachingAdvisingCourses');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		name: 'CEN 3031 Introduction to Software Engineering',
		description: 'An Introduction to the concepts of software engineering.',
		evaluationNumber: 4.84
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'teachingAdvisingCourses/teachingAdvisingCourses.tex', TeachingAdvisingCourses, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};