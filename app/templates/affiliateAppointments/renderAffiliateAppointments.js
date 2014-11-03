'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var AffiliateApp = mongoose.model('affiliateAppointments');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( AffiliateApp, 'affiliateAppointments/affiliateAppointments.tex', 'affiliateAppointments/na.tex');

var is = require('is-js');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	app: 'whatevs, bro'
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
	if(is.empty(req.body.affiliateAppointments)) return callback(null, null);

	var affApp = new AffiliateApp({
		app: req.body.affiliateAppointments.appointments,
		user: req.user		
	});

	affApp.save(function(err) {
		callback(err, affApp);
	});
};