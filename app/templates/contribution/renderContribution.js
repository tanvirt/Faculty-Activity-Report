'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var Contribution = mongoose.model('Contribution');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Contribution, 'contribution/contribution.tex', 'contribution/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'I made the following contributions...'
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
	if (is.empty(req.body.contribution)) return callback(null, null);

	var contribution = new Contribution({
		info: req.body.contribution.info,
		user: req.user		
	});

	contribution.save(function(err) {
		callback(err, contribution);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.contribution, {
		report: report,
		user: user
	});

	var contribution = new Contribution(save);

	contribution.save(function(err) {
		cb(err, contribution);
	});
};