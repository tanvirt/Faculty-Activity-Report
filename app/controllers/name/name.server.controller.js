'use strict';

var mongoose = require('mongoose');
var Name = mongoose.model('Name');

var modelClass = require('../../templates/modelClass');
var renderModel = new modelClass.RenderModel( Name, 'name/name.tex', 'name/na.tex');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

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
exports.render = function(req, callback) {
	renderModel.render(req, callback);
};

/*
Gets the data from the frontend and
saves it in the database.
*/
exports.create = function(req, res) {
	console.log(require('util').inspect(req.report));

	if (is.empty(req.body.name)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.name did not get send to backend',
			changes: 'No Name Created'
		});
	}

	var name = new Name({
		firstName: req.body.name.firstName,
		middleName: req.body.name.middleName,
		lastName: req.body.name.lastName,
		user: req.user,
		report: req.report
	});

	name.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//req.report.name = name;
			//req.report.save();
			res.jsonp(name);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.name)) {
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.name did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var name = req.name;

	name = _.extend(name, req.body.name);

	name.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(name);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.name);
};

exports.nameById = function(req, res, next, id) {
	Name.findById(id)
	.exec(function(err, name) {
		if (err) return next(err);
		if (!name) return next(new Error('Failed to load Name ' + id));
		req.name = name;
		next();
	});
};