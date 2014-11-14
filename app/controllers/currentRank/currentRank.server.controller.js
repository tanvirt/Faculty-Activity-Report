'use strict';

var mongoose = require('mongoose');
var CurrentRank = mongoose.model('CurrentRank');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

exports.create = function(req, res, callback) {
	if (is.empty(req.body.currentRank)) {
		res.status(400);
		return callback({
			err: 'Post (create): Does not exist',
			message: 'req.body.currentRank did not get send to backend',
			changes: 'No CurrentRank Created'
		});
	}

	var currentRank = new CurrentRank({
		rank: req.body.currentRank.rank,
		department: req.body.currentRank.department,
		user: req.user,
		report: req.report
	});

	currentRank.save(function(err) {
		//req.report.currentRank = currentRank;
		//req.report.save();
		callback(err, currentRank);
	});
};

exports.update = function(req, res, callback) {
	if (is.empty(req.body.currentRank)) {
		res.status(400);
		return callback({
			err: 'Put (update): Does not exist',
			message: 'req.body.currentRank did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	CurrentRank.findById(req.profile.currentRank, function(err, model) {
		if (err) {
			res.status(400);
			return callback({
				err: 'Finding Failed'
			});
		}

		var currentRank = _.extend(model, req.body.currentRank);
		currentRank.save(function(err) {
			callback(err, currentRank);
		});
	});
};