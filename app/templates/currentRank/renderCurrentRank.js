'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var CurrentRank = mongoose.model('currentRank');
var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( CurrentRank, 'currentRank/currentRank.tex', 'currentRank/na.tex');

/*
Populates the database with test data
*/
renderModel.setDebugPopulate( false, {
	rank: 'faculty'
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
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	var currentRank = new CurrentRank({
		rank: req.body.currentRank,
		//department: req.body.department,
		user: req.user		
	});

	currentRank.save(function(err) {
		callback(null, currentRank);
	});
};

