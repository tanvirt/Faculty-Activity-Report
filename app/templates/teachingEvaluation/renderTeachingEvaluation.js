'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var teachingEvaluation = mongoose.model('TeachingEvaluation');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		teacher: 'testName',
		course: 'testCourse1',
		year: 2003,
		semester: 'fall',
		enrolled: 100,
		responses: 30,
		teacherMean: [1,2,3,1,2,3,1,2,3],
		departmentMean: [2,3,4,2,3,4,2,3,4],
		collegeMean: [4,4,4,4,4,4,4,4,4]
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'teachingEvaluation/teachingEvaluation.tex', teachingEvaluation, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};