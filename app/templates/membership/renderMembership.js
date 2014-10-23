'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Membership = mongoose.model('Membership');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		examples: [{
			title: 'Internation Conference on Data Engineering',
			year: 2014
		},
		{
			title: 'ACM-SIGMOD',
			year: 2014
		}]
	});

	return obj;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'memberships': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('membership/membership.tex', Membership, {}, passObj, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};
