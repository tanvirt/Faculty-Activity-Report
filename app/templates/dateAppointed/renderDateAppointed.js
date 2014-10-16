'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var DateAppointed = mongoose.model('DateAppointed');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		theDate: 'August 2000'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'dateAppointed/dateAppointed.tex', DateAppointed, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};

module.exports.submit = function(req, callback) {
	var dateApp = new DateAppointed({
		theDate: req.body.dateAppointed,
		user: req.user		
	});

	dateApp.save(function(err) {
		callback(null, dateApp);
	});
};