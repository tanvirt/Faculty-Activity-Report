'use strict';

var mongoose = require('mongoose');

// Compile Schema into Model here
var FurtherInformationSection = mongoose.model('FurtherInformationSection');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( FurtherInformationSection, 'furtherInformationSection/furtherInformationSection.tex', 'furtherInformationSection/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

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
	renderModel.renderHTML(req, callback);
};

module.exports.submit = function(req, callback) {
	if (is.empty(req.body.furtherInformationSection)) return callback(null, null);

	var furtherInfo = new FurtherInformationSection({
		info: req.body.furtherInformationSection.info,
		user: req.user		
	});

	furtherInfo.save(function(err) {
		callback(err, furtherInfo);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.furtherInformationSection, {
		report: report,
		user: user
	});

	var furtherInformationSection = new FurtherInformationSection(save);

	furtherInformationSection.save(function(err) {
		cb(err, furtherInformationSection);
	});
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPrevious(FurtherInformationSection, {furtherInformationSection: undefined}, report, user, prevId, cb);
};
