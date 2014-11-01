'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var AssignedActivity = mongoose.model('AssignedActivity');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( AssignedActivity, 'assignedActivity/assignedActivity.tex', 'assignedActivity/na.tex');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	springTeaching: 20, springResearch: 40, springService: 40,
	summerTeaching: 30, summerResearch: 60, summerService: 10,
	fallTeaching: 70, fallResearch: 15, fallService: 15
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
	//console.log(require('util').inspect(req.body));

	var act = new AssignedActivity({
		springTeaching: req.body.springTeaching, springResearch: req.body.springResearch, springService: req.body.springService,
		summerTeaching: req.body.summerTeaching, summerResearch: req.body.summerResearch, summerService: req.body.summerService,
		fallTeaching: req.body.fallTeaching, fallResearch: req.body.fallResearch, fallService: req.body.fallService,
		year: req.body.year,
		user: req.user
	});

	act.save(function(err) {
		callback(err, act);
	});
};
