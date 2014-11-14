'use strict';

var mongoose = require('mongoose');
var consultationsOutsideUniversity = mongoose.model('consultationsOutsideUniversity');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel(consultationsOutsideUniversity, 'consultationsOutsideUniversity/consultationsOutsideUniversity.tex', 'consultationsOutsideUniversity/na.tex');

var is = require('is-js');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	consultation: 'Consultations outside the university go here...'
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
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	if (is.empty(req.body.consultationsOutsideUniversity)) return callback(null, null);

	var consultations = new consultationsOutsideUniversity({
		consultation: req.body.consultationsOutsideUniversity.consultation,
		user: req.user
	});

	consultations.save(function(err) {
		callback(err, consultations);
	});
};

