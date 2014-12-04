'use strict';

var mongoose = require('mongoose');
var Name = mongoose.model('Name');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Name, 'name/name.tex', 'name/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	firstName: 'Rosie',
	middleName: 'T',
	lastName: 'Poodle'
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

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.name, {report: report, user: user});

	var name = new Name(save);
		
	name.save(function(err) {
		cb(err, name);
	});
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPrevious(Name, {name: undefined}, report, user, prevId, cb);
};
