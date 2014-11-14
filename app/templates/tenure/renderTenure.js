'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var Tenure = mongoose.model('Tenure');
var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Tenure, 'tenure/tenure.tex', 'tenure/na.tex');

var is = require('is-js');

/*
Populates the database with test data
*/
renderModel.setDebugPopulate( false, {
	tenure: 'Tenured'
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
	if (is.empty(req.body.tenure)) return callback(null, null);

	var tenure = new Tenure({
		tenure: req.body.tenure.tenure,
		user: req.user		
	});

	tenure.save(function(err) {
		callback(err, tenure);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	renderModel.createDefaultData(report, user, cb);
};