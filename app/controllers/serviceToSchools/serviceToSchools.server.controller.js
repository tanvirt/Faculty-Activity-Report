'use strict';

var mongoose = require('mongoose');
var ServiceToSchools = mongoose.model('ServiceToSchools');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

/*
Gets the data from the frontend and
saves it in the database.
*/
exports.create = function(req, res) {
	if (is.empty(req.body.serviceToSchools)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.serviceToSchools did not get send to backend',
			changes: 'No Service_To_Schools Created'
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
			//req.report.serviceToSchools = serviceToSchools;
			//req.report.save();
			res.jsonp(serviceToSchools);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.serviceToSchools)) {
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
	ServiceToSchools.findOne({report: req.report}, function(err, result) {
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
	.exec(function(err, serviceToSchools) {
		if (err) return next(err);
		if (!serviceToSchools) return next(new Error('Failed to load ServiceToSchools ' + id));
		req.serviceToSchools = serviceToSchools;
		next();
	});
};