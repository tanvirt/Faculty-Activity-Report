'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var Contribution = mongoose.model('Contribution');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Contribution, 'contribution/contribution.tex', 'contribution/na.tex');

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
	renderModel.render(req, callback);
};

module.exports.submit = function(req, callback) {
	var contribution = new Contribution({
		info: req.body.contribution.info,
		user: req.user		
	});

	contribution.save(function(err) {
		callback(err, contribution);
	});
};