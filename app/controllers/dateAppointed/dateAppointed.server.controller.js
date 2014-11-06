'use strict';

var mongoose = require('mongoose');
var DateAppointed = mongoose.model('DateAppointed');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

exports.create = function(req, res, callback) {
	if (is.empty(req.body.dateAppointed)) {
		res.status(400);
		return callback({
			err: 'Post (create): Does not exist',
			message: 'req.body.dateAppointed did not get send to backend',
			changes: 'No DateAppointed Created'
		});
	}

	var dateAppointed = new DateAppointed({
		date: req.body.dateAppointed.date,
		user: req.user,
		report: req.report
	});

	dateAppointed.save(function(err) {
		callback(err, dateAppointed);
	});
};

exports.update = function(req, res, callback) {
	if (is.empty(req.body.dateAppointed)) {
		res.status(400);
		return callback({
			err: 'Put (update): Does not exist',
			message: 'req.body.dateAppointed did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	DateAppointed.findById(req.profile.dateAppointed, function(err, model) {
		if (err) {
			res.status(400);
			return callback({
				err: 'Finding Failed'
			});
		}

		var dateAppointed = _.extend(model, req.body.dateAppointed);
		dateAppointed.save(function(err) {
			callback(err, dateAppointed);
		});
	});
};