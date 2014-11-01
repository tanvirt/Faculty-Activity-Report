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

module.exports.submit = function(req, callback) {
	var membership = new Membership({
		info: req.body.membership,
		user: req.user		
	});

	membership.save(function(err) {
		callback(null, membership);
	});
};