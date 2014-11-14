'use strict';

var mongoose = require('mongoose');
var TeachingAdvising = mongoose.model('TeachingAdvising');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( TeachingAdvising, 'teachingAdvising/teachingAdvising.tex', 'teachingAdvising/na.tex');

var is = require('is-js');

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
	renderModel.render(req, callback);
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
	renderModel.createDefaultData(report, user, cb);
};
