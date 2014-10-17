'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Conferences = mongoose.model('Conferences');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		area: 'Local',
		presentation: 'Lecture',
		title: 'Cool Conference Hall',
		date: 'October 2012',
		where: 'Gainesville, FL'
	});

	objs[1] = new Model({
		area: 'International',
		presentation: 'Poster',
		title: 'Elzeigenben Ogernchsizt',
		date: 'June 12, 2006',
		where: 'Greenland'
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'conferences': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('conferences/conferences.tex', Conferences, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
