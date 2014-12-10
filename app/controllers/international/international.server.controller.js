'use strict';

var mongoose = require('mongoose');
var International = mongoose.model('International');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.international)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.international did not get sent to backend',
			changes: 'No International Created'
		});
	}

	var international = new International({
		info: req.body.international.info,

		user: req.user,
		report: req.report
	});

	international.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(international);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.international)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.international did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var international = req.international;

	international = _.extend(international, req.body.international);

	international.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(international);
		}
	});
};

exports.readFromReport = function(req, res) {
	International.findOne({report: req.report})
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
	res.jsonp(req.international);
};

exports.internationalById = function(req, res, next, id) {
	International.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, international) {
		if (err) return next(err);
		if (!international) return next(new Error('Failed to load International ' + id));
		req.international = international;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.international.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};