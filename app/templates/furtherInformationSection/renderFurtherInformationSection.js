'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var furtherInformationSection = mongoose.model('furtherInformationSection');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( furtherInformationSection, 'furtherInformationSection/furtherInformationSection.tex', 'furtherInformationSection/na.tex');

var is = require('is-js');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'Any further information goes here...'
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
	if (is.empty(req.body.furtherInformationSection)) return callback(null, null);

	var furtherInfo = new furtherInformationSection({
		info: req.body.furtherInformationSection.info,
		user: req.user		
	});

	furtherInfo.save(function(err) {
		callback(err, furtherInfo);
	});
};
