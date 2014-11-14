'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var International = mongoose.model('International');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( International, 'international/international.tex', 'international/na.tex');

var is = require('is-js');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	activities: 'I participated in things in other countries'
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
	if (is.empty(req.body.international)) return callback(null, null);

	var international = new International({
		activities: req.body.international.activities,
		user: req.user		
	});

	international.save(function(err) {
		callback(err, international);
	});
};