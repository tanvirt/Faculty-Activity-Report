'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var AssignedActivity = mongoose.model('AssignedActivity');

/*
Populates the database with test data
*/
function dummyObjects() {
	var objs = [],
	
	objs[0] = new AssignedActivity({
		year: 2014,
		semester: 'fall',
		teaching: 30,
		research: 40,
		service: 30
	)};
	objs[1] = new AssignedActivity({
		year: 2014,
		semester: 'spring',
		teaching: 20,
		research: 50,
		service: 30
	)};
	objs[2] = new AssignedActivity({
		year: 2014,
		semester: 'summer',
		teaching: 10,
		research: 70,
		service: 20
	});
	
	return objs;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'assignedActivity/assignedActivity.tex', AssignedActivity, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};