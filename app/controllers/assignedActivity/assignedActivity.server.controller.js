'use strict';

var mongoose = require('mongoose');
var AssignedActivity = mongoose.model('AssignedActivity');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

exports.create = function(req, res) {
	if (is.empty(req.body.assignedActivity)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.assignedActivity did not get send to backend',
			changes: 'No AssignedActivity Created'
		});
	}

	var assignedActivity = new AssignedActivity({
		year: req.body.assignedActivity.year,

		springTeaching: req.body.assignedActivity.springTeaching,
		springResearch: req.body.assignedActivity.springResearch,
		springService: req.body.assignedActivity.springService,

		fallTeaching: req.body.assignedActivity.fallTeaching,
		fallResearch: req.body.assignedActivity.fallResearch,
		fallService: req.body.assignedActivity.fallService,

		summerTeaching: req.body.assignedActivity.summerTeaching,
		summerResearch: req.body.assignedActivity.summerResearch,
		summerService: req.body.assignedActivity.summerService,

		user: req.user,
		report: req.report
	});

	assignedActivity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.report.assignedActivity = assignedActivity;
			req.report.save();
			res.jsonp(assignedActivity);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.assignedActivity)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.assignedActivity did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var assignedActivity = req.assignedActivity;

	assignedActivity = _.extend(assignedActivity, req.body.assignedActivity);

	assignedActivity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignedActivity);
		}
	});
};

exports.readFromReport = function(req, res) {
	AssignedActivity.findOne({report: req.report}, function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.assignedActivity);
};

exports.assignedActivityById = function(req, res, next, id) {
	AssignedActivity.findById(id)
	.exec(function(err, assignedActivity) {
		if (err) return next(err);
		if (!assignedActivity) return next(new Error('Failed to load AssignedActivity ' + id));
		req.assignedActivity = assignedActivity;
		next();
	});
};