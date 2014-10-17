'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Consultations = mongoose.model('consultationsOutsideUniversity');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		consultation: 'one'
	});

	objs[1] = new Model({
		consultation: 'two'
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'consultations': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('consultationsOutsideUniversity/consultationsOutsideUniversity.tex', Consultations, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
