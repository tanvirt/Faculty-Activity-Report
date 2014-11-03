'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var honors = mongoose.model('honors');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( honors, 'honors/honors.tex', 'honors/na.tex');

var is = require('is-js');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'I received the following honors...'
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

	if (is.empty(req.body.honors)) return callback(null, null);

	var honors = new honors({
		info: req.body.honors.info,
		user: req.user		
	});

	honors.save(function(err) {
		callback(err, honors);
	});
};
