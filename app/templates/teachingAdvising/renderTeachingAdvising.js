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



/*'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var TeachingAdvising = mongoose.model('TeachingAdvising');

/*
Populates the database with test data

function dummyObject(Model) {
	var obj = new Model({
		info: 'My teaching philosophy is...and I taught the following courses: '
		//philosophy: 'I have a dream',
		//supervising: 'about cake'
	});
	return obj;
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.

module.exports.render = function (callback) {
	renderModel.render( 'teachingAdvising/teachingAdvising.tex', TeachingAdvising, dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
};*/