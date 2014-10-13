'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var TeachingAdvisingCourses = mongoose.model('TeachingAdvisingCourses');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];

	objs[0] = new Model({
		name: 'CEN 3031 Introduction to Software Engineering',
		description: 'An Introduction to the concepts of software engineering.',
		evaluationNumber: 4.85
	});

	objs[1] = new Model({
		name: 'COP 6726 Database System Implementation',
		description: 'This is an advanced class on databse system implementation.',
		evaluationNumber: 4.48
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'courses': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.renderMultiple('teachingAdvisingCourses/teachingAdvisingCourses.tex', TeachingAdvisingCourses, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
