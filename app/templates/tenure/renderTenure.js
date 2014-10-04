'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Tenure = mongoose.model('TenureSchema');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		tenure: 'Tenured'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'tenure/tenure.tex', Tenure, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};