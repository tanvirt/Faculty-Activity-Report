'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var AssignedActivity = mongoose.model('AssignedActivity');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( AssignedActivity, 'assignedActivity/assignedActivity.tex', 'assignedActivity/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	year: 2000,
	springTeaching: 20, 
	springResearch: 40, 
	springService: 40,

	summerTeaching: 30, 
	summerResearch: 60, 
	summerService: 10,

	fallTeaching: 70, 
	fallResearch: 15, 
	fallService: 15
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
	//console.log('Here1: ' + req.body.assignedActivity);
	if(is.empty(req.body.assignedActivity)) {
		return callback(null, null);
	}

	var act = new AssignedActivity({
		springTeaching: req.body.assignedActivity.springTeaching, 
		springResearch: req.body.assignedActivity.springResearch, 
		springService: req.body.assignedActivity.springService,
		summerTeaching: req.body.assignedActivity.summerTeaching, 
		summerResearch: req.body.assignedActivity.summerResearch, 
		summerService: req.body.assignedActivity.summerService,
		fallTeaching: req.body.assignedActivity.fallTeaching, 
		fallResearch: req.body.assignedActivity.fallResearch, 
		fallService: req.body.assignedActivity.fallService,
		year: req.body.assignedActivity.year,
		user: req.user
	});

	act.save(function(err) {
		callback(err, act);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.assignedActivity, {
		year: 2000,
		springTeaching: 20, 
		springResearch: 40, 
		springService: 40,

		summerTeaching: 30, 
		summerResearch: 60, 
		summerService: 10,

		fallTeaching: 70, 
		fallResearch: 15, 
		fallService: 15
	});

	var assignedActivity = new AssignedActivity(save);

	assignedActivity.save(function(err) {
		cb(err, assignedActivity);
	});
};
