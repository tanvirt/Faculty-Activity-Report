'use strict';

var mongoose = require('mongoose');
var Membership = mongoose.model('Membership');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
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
			res.jsonp(membership);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.membership)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.membership did not get send to backend',
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
	Membership.findOne({report: req.report})
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
	res.jsonp(req.membership);
};

exports.membershipById = function(req, res, next, id) {
	Membership.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, membership) {
		if (err) return next(err);
		if (!membership) return next(new Error('Failed to load Membership ' + id));
		req.membership = membership;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.membership.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};