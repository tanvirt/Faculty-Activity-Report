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
renderModel.setDebugPopulate( true, {
	springTeaching: 20, springResearch: 40, springService: 20,
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
	renderModel.findOneModelByReport( req, function( obj ) {
		renderModel.render( obj, callback );
	});
};

/*
//Exactly the same as the render above, but 
//uses the fidnModelsByReport, which returns
//an array of JSON objects

module.exports.render = function(req, callback) {
	renderModel.findModelsByReport( req, function( arrayOfObjs ) {
		return arrayOfObjs[0];
	}, function( single_obj ) {
		renderModel.render( single_obj, callback );
	});
};
*/

/*
Gets the data from the frontend and
saves it in the database.
*/

module.exports.submit = function(req, callback) {
	console.log('Spring teaching is ' + req.body.springTeaching);
	console.log('Spring research is ' + req.body.springResearch);
	console.log('Spring service is ' + req.body.springService);	

	console.log('Summer teaching is ' + req.body.summerTeaching);
	console.log('Summer research is ' + req.body.summerResearch);
	console.log('Summer service is ' + req.body.summerService);	

	console.log('Fall teaching is ' + req.body.fallTeaching);
	console.log('Fall research is ' + req.body.fallResearch);
	console.log('Fall service is ' + req.body.fallService);	


	var act = new AssignedActivity({
		springTeaching: req.body.springTeaching, springResearch: req.body.springResearch, springService: req.body.springService,
		summerTeaching: req.body.summerTeaching, summerResearch: req.body.summerResearch, summerService: req.body.summerService,
		fallTeaching: req.body.fallTeaching, fallResearch: req.body.fallResearch, fallService: req.body.fallService,
		user: req.user
	});

	act.save(function(err) {
		callback(err, act);
	});
};
