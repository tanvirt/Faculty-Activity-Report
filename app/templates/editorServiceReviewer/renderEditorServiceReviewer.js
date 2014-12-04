'use strict';

var mongoose = require('mongoose');
var EditorServiceReviewer = mongoose.model('EditorServiceReviewer');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( EditorServiceReviewer, 'editorServiceReviewer/editorServiceReviewer.tex', 'editorServiceReviewer/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'debug string'
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

/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	if (is.empty(req.body.editorServiceReviewer)) return callback(null, null);

	var esr = new EditorServiceReviewer({
		info: req.body.editorServiceReviewer.info,
		user: req.user
	});

	esr.save(function(err) {
		callback(err, esr);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.editorServiceReviewer, {
		report: report,
		user: user
	});

	var editorServiceReviewer = new EditorServiceReviewer(save);

	editorServiceReviewer.save(function(err) {
		cb(err, editorServiceReviewer);
	});
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPrevious(EditorServiceReviewer, {editorServiceReviewer: undefined}, report, user, prevId, cb);
};
