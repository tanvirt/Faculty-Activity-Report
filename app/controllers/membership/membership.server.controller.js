'use strict';

var mongoose = require('mongoose');
var Membership = mongoose.model('Membership');

var errorHandler = require('../errors');

var is = require('is-js');

var path = require('path');
var join = path.join;

var _ = require('lodash');

/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.membership)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.membership did not get sent to backend',
			changes: 'No Membership Created'
		});
	}

	var membership = new Membership({
		info: req.body.membership.info,

		user: req.user,
		report: req.report
	});

	membership.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.report.membership = membership;
			req.report.save();
			res.jsonp(membership);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.membership)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.membership did not get sent to backend',
			changes: 'No Changes Made'
		});
	}

	var membership = req.membership;

	membership = _.extend(membership, req.body.membership);

	membership.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(membership);
		}
	});
};

exports.readFromReport = function(req, res) {
	Membership.findOne({report: req.report}, function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.membership);
};

exports.membershipById = function(req, res, next, id) {
	Membership.findById(id)
	.exec(function(err, membership) {
		if (err) return next(err);
		if (!membership) return next(new Error('Failed to load Membership ' + id));
		req.membership = membership;
		next();
	});
};