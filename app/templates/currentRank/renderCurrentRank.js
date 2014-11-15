'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var CurrentRank = mongoose.model('CurrentRank');
var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( CurrentRank, 'currentRank/currentRank.tex', 'currentRank/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
Populates the database with test data
*/
renderModel.setDebugPopulate( false, {
	rank: 'Professor',
	department: 'Agricultural and Biological Engineering'
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
	if (is.empty(req.body.currentRank)) return callback(null, null);

	var currentRank = new CurrentRank({
		rank: req.body.currentRank.rank,
		department: req.body.currentRank.department,
		user: req.user		
	});

	currentRank.save(function(err) {
		callback(err, currentRank);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.currentRank, {
		report: report,
		user: user
	});

	var currentRank = new CurrentRank(save);

	currentRank.save(function(err) {
		cb(err, currentRank);
	});
};
