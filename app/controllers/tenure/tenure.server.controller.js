'use strict';

var mongoose = require('mongoose');
var Tenure = mongoose.model('Tenure');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

exports.createJSON = function(req, res, callback) {
	if (is.empty(req.body.tenure)) {
		res.status(400);
		return callback({
			err: 'Post (create): Does not exist',
			message: 'req.body.tenure did not get send to backend',
			changes: 'No Tenure Created'
		});
	}

	var tenure = new Tenure({
		tenure: req.body.tenure.tenure,
		user: req.user,
		report: req.report
	});

	tenure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//req.report.tenure = tenure;
			//req.report.save();
			console.log('tenure: ' + tenure);
			callback(tenure);
		}
	});
};

exports.create = function(req, res) {
	exports.createJSON(req, res, function(model) {
		res.jsonp(model);
	});
};

exports.updateJSON = function(req, res, callback) {
	if (is.empty(req.body.tenure)) {
		return callback({
			err: 'Put (update): Does not exist',
			message: 'req.body.tenure did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var tenure = req.tenure;

	tenure = _.extend(tenure, req.body.tenure);

	tenure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return callback(tenure);
		}
	});	
};

exports.update = function(req, res) {
	exports.updateJSON(req, res, function(model) {
		res.jsonp(model);
	});
};

exports.readFromReportJSON = function(req, res, callback) {
	Tenure.findOne({report: req.report}, function(err, result) {
		return callback(result);
	});
};

exports.readFromReport = function(req, res) {
	exports.readFromReportJSON(req, res, function(err, model) {
		if (err) return res.jsonp(err);
		res.jsonp(model);
	});
};

exports.readJSON = function(req, res, callback) {
	callback(req.tenure);
};

exports.read = function(req, res) {
	exports.readTenureJSON(req, res, function(tenure) {
		res.jsonp(tenure);
	});
};

exports.tenureById = function(req, res, next, id) {
	Tenure.findById(id)
	.exec(function(err, tenure) {
		if (err) return next(err);
		if (!tenure) return next(new Error('Failed to load Tenure ' + id));
		req.tenure = tenure;
		next();
	});
};