'use strict';

var mongoose = require('mongoose');
// Compile Schema into Model here
var DateAppointed = mongoose.model('DateAppointed');
var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( DateAppointed, 'dateAppointed/dateAppointed.tex', 'dateAppointed/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	date: 'November 2012'
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
	if (is.empty(req.body.dateAppointed)) return callback(null, null);

	var dateApp = new DateAppointed({
		date: req.body.dateAppointed.date,
		user: req.user		
	});

	dateApp.save(function(err) {
		callback(err, dateApp);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.dateAppointed, {
		report: report,
		user: user
	});

	var dateAppointed = new DateAppointed(save);

	dateAppointed.save(function(err) {
		cb(err, dateAppointed);
	});
};