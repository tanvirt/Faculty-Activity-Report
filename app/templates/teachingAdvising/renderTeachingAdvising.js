'use strict';

var mongoose = require('mongoose');
var TeachingAdvising = mongoose.model('TeachingAdvising');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( TeachingAdvising, 'teachingAdvising/teachingAdvising.tex', 'teachingAdvising/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	info: 'My teaching philosophy is...and I taught the following courses: '
});

/*
will explicitely print the N/A latex
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
	if (is.empty(req.body.teachingAdvising)) return callback(null, null);

	var teachingAdvising = new TeachingAdvising({
		info: req.body.teachingAdvising.advising,
		user: req.user
	});

	teachingAdvising.save(function(err) {
		callback(err, teachingAdvising);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.teachingAdvising, {
		report: report,
		user: user
	});

	var teachingAdvising = new TeachingAdvising(save);

	teachingAdvising.save(function(err) {
		cb(err, teachingAdvising);
	});
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPrevious(TeachingAdvising, {teachingAdvising: undefined}, report, user, prevId, cb);
};
