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
		//teacher: 'testName',
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

function passObj(objArray)
{
	return {'evaluation': objArray, 'sum': objArray.findTotalMean()};
}




/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.renderMultiple( 'teachingEvaluation/teachingEvaluation.tex', teachingEvaluation, { }, passObj,dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};

module.exports.submit = function(req, res, callback) {
	teachingEvaluation.create({
		course: req.body.teachingEvaluation.course,
		year: req.body.teachingEvaluation.year,
		semester: req.body.teachingEvaluation.semester,
		enrolled: req.body.teachingEvaluation.numberEnrolled,
		responses: req.body.teachingEvaluation.responses,
		teacherMean: [1,2,3,1,2,3,1,2,3],  //Figure out array.
		departmentMean: [2,3,4,2,3,4,2,3,4],
		collegeMean: [4,4,4,4,4,4,4,4,4],
		user: req.user
	}, function(err) {
		callback(err);
	});
};

