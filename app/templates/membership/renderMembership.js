'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var Membership = mongoose.model('Membership');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Membership, 'membership/membership.tex', 'membership/na.tex');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'I am a member of the following organizations...'
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
	var membership = new Membership({
		info: req.body.membership.info,
		user: req.user		
	});

	membership.save(function(err) {
		callback(err, membership);
	});
};