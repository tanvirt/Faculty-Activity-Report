'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var International = mongoose.model('International');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( International, 'international/international.tex', 'international/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'I participated in things in other countries'
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
	renderModel.renderHTML(req, callback);
};

module.exports.submit = function(req, callback) {
	if (is.empty(req.body.international)) return callback(null, null);

	var international = new International({
		info: req.body.international.info,
		user: req.user		
	});

	international.save(function(err) {
		callback(err, international);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.international, {
		report: report,
		user: user
	});

	var international = new International(save);

	international.save(function(err) {
		cb(err, international);
	});
};