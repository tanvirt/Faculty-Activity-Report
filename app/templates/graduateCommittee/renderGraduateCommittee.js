'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var graduateCommittee = mongoose.model('GraduateCommittee');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var models = [];
	
	models[0] = new Model({
		//teacher: 'testName',
		role: 'Chair',
		studentName: 'studentTestName01',
		degree: 'M.S.',
		major: 'Computer Science',
		degreeDate: '10/10/1990'
	});
	
	models[1] = new Model({
		//teacher: 'testName',
		role: 'External',
		studentName: 'studentTestName02',
		degree: 'Ph.D.',
		major: 'Computer Engineering',
		degreeDate: '11/11/1991'
	});
	
	models[2] = new Model({
		//teacher: 'testName',
		role: 'Member',
		studentName: 'studentTestName03',
		degree: 'M.S.',
		major: 'Cooking',
		degreeDate: '12/12/1992'
	});
	
	models[3] = new Model({
		//teacher: 'testName',
		role: 'Member',
		studentName: 'studentTestName04',
		degree: 'Ph.D.',
		major: 'Computer Science',
		degreeDate: '10/11/1992'
	});
	
	return models;
}


function passObj(objArray)
{
	return {'Committee': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.renderMultiple( 'graduateCommittee/graduateCommittee.tex', graduateCommittee, { }, passObj,dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};

module.exports.submit = function(req, res, callback) {
	graduateCommittee.create({
		role: req.body.graduateCommittee.role,
		studentName: req.body.graduateCommittee.studentName,
		degree: req.body.graduateCommittee.degree,
		major: req.body.graduateCommittee.major,
		degreeDate: req.body.graduateCommittee.degreeDate,
		user: req.user
	}, function(err) {
		callback(err);
	});
};

