'use strict';

var mongoose = require('mongoose');
var ServiceToSchools = mongoose.model('ServiceToSchools');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel(ServiceToSchools, 'serviceToSchools/serviceToSchools.tex', 'serviceToSchools/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	service: 'Service to schools goes here...'
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

/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	if (is.empty(req.body.serviceToSchools)) return callback(null, null);

	var services = new ServiceToSchools({
		service: req.body.serviceToSchools.service,
		user: req.user
	});

	services.save(function(err) {
		callback(err, services);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.serviceToSchools, {
		report: report,
		user: user
	});

	var serviceToSchools = new ServiceToSchools(save);

	serviceToSchools.save(function(err) {
		cb(err, serviceToSchools);
	});
};

