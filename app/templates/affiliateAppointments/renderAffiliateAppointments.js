'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var AffiliateAppointments = mongoose.model('AffiliateAppointments');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( AffiliateAppointments, 'affiliateAppointments/affiliateAppointments.tex', 'affiliateAppointments/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	app: 'whatevs, bro'
});

/*
will explicitly print the N/A latex
to the screen for debugging purposes
*/
renderModel.isDebugNull = false;

/*
render function that finds the obj in the database
and converts it into latex.
*/
module.exports.render = function(req, callback) {
	renderModel.render(req, callback);
};

module.exports.submit = function(req, callback) {
	if (is.empty(req.body.affiliateAppointments)) return callback(null, null);

	var affiliateAppointments = new AffiliateAppointments({
		app: req.body.affiliateAppointments.appointments,
		user: req.user		
	});

	affiliateAppointments.save(function(err) {
		callback(err, affiliateAppointments);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.affiliateAppointments, {
		report: report,
		user: user
	});

	var affiliateAppointments = new AffiliateAppointments(save);

	affiliateAppointments.save(function(err) {
		cb(err, affiliateAppointments);
	});
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPrevious(AffiliateAppointments, {affiliateAppointments: undefined}, report, user, prevId, cb);
};