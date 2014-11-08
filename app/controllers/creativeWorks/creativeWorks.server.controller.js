'use strict';

var mongoose = require('mongoose');
var CreativeWorks = mongoose.model('CreativeWorks');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.creativeWorks)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.creativeWorks did not get send to backend',
			changes: 'No CreativeWorks Created'
		});
	}

	var creativeWorks = new CreativeWorks({
		name: req.body.creativeWorks.name,
		description: req.body.creativeWorks.description,
		website: req.body.creativeWorks.website,
		jointEfforts: req.body.creativeWorks.jointEfforts,
		date: req.body.creativeWorks.date,

		user: req.user,
		report: req.report
	});

	creativeWorks.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.report.creativeWorks = creativeWorks;
			req.report.save();

			res.jsonp(creativeWorks);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.creativeWorks)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.creativeWorks did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var creativeWorks = req.creativeWorks;

	creativeWorks = _.extend(creativeWorks, req.body.creativeWorks);

	creativeWorks.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(creativeWorks);
		}
	});
};

exports.readFromReport = function(req, res) {
	CreativeWorks.find({report: req.report}, function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.creativeWorks);
};

exports.creativeWorksById = function(req, res, next, id) {
	CreativeWorks.findById(id)
	.exec(function(err, creativeWorks) {
		if (err) return next(err);
		if (!creativeWorks) return next(new Error('Failed to load CreativeWorks ' + id));
		req.creativeWorks = creativeWorks;
		next();
	});
};