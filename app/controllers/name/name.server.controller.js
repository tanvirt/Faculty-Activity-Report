'use strict';

var mongoose = require('mongoose');
var Name = mongoose.model('Name');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

/*
Gets the data from the frontend and
saves it in the database.
*/

exports.createJSON = function(req, res, callback) {
	if (is.empty(req.body.name)) {
		res.status(400);
		return callback({
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
			callback(name);
		}
	});
};

exports.create = function(req, res) {
	exports.createJSON(req, res, function(model) {
		res.jsonp(model);
	});
};

exports.updateJSON = function(req, res, callback) {
	if (is.empty(req.body.name)) {
		res.status(400);
		return callback({
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
			callback(JSON.stringify(name));
		}
	});
};

exports.update = function(req, res) {
	exports.updateJSON(req, res, function(model) {
		res.jsonp(model);
	});
};

exports.readFromReportJSON = function(req, res, callback) {
	Name.findOne({report: req.report}, function(err, result) {
		return callback(err, result);
	});
};

exports.readFromReport = function(req, res) {
	exports.readFromReportJSON(req, res, function(err, model) {
		if (err) return res.jsonp(err);
		res.jsonp(model);
	});
};

exports.readJSON = function(req, res, callback) {
	callback(req.name);
};

exports.read = function(req, res) {
	exports.readJSON(req, res, function(name) {
		res.jsonp(name);
	});
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