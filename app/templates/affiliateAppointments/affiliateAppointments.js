'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var AffiliateApp = mongoose.model('affiliateAppointments');

/*
Populates the database with test data
*/
function dummyObject(Model) {
	var obj = new Model({
		app: 'this is some nonsensical jibberish'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (callback) {
	renderModel.render( 'affiliateAppointments/affiliateAppointments.tex', AffiliateApp, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};

module.exports.submit = function(req, callback) {
	var affApp = new AffiliateApp({
		app: req.body.affiliateAppointments,
		user: req.user		
	});

	affApp.save(function(err) {
		callback(null, name);
	});
};