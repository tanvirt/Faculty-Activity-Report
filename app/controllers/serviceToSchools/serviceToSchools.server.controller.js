'use strict';

var mongoose = require('mongoose');
var ServiceToSchools = mongoose.model('ServiceToSchools');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.serviceToSchools)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.serviceToSchools did not get sent to backend',
			changes: 'No ServiceToSchools Created'
		});
	}

	var serviceToSchools = new ServiceToSchools({
		info: req.body.serviceToSchools.info,

		user: req.user,
		report: req.report
	});

	serviceToSchools.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceToSchools);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.serviceToSchools)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.serviceToSchools did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var serviceToSchools = req.serviceToSchools;

	serviceToSchools = _.extend(serviceToSchools, req.body.serviceToSchools);

	serviceToSchools.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(serviceToSchools);
		}
	});
};

exports.readFromReport = function(req, res) {
	ServiceToSchools.findOne({report: req.report})
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.serviceToSchools);
};

exports.serviceToSchoolsById = function(req, res, next, id) {
	ServiceToSchools.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, serviceToSchools) {
		if (err) return next(err);
		if (!serviceToSchools) return next(new Error('Failed to load ServiceToSchools ' + id));
		req.serviceToSchools = serviceToSchools;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.serviceToSchools.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};
