'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var International = mongoose.model('International');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		activities: 'N/A'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'international/international.tex', International, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};