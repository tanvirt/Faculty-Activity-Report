'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var AssignedActivity = mongoose.model('AssignedActivity');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		year: 2014,
		
		fall: {
			teaching: 45,
			research: 40,
			service: 15
		},
		spring: {
			teaching: 45,
			research: 40,
			service: 15
		},
		summer: {
			teaching: 45,
			research: 40,
			service: 15
		}
		
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'assignedActivity/assignedActivity.tex', AssignedActivity, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};