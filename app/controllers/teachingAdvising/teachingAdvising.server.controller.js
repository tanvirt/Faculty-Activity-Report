'use strict';

var mongoose = require('mongoose');
var TeachingAdvising = mongoose.model('TeachingAdvising');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.teachingAdvising)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.teachingAdvising did not get sent to backend',
			changes: 'No TeachingAdvising Created'
		});
	}

	var teachingAdvising = new TeachingAdvising({
		info: req.body.teachingAdvising.info,

		user: req.user,
		report: req.report
	});

	teachingAdvising.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teachingAdvising);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.teachingAdvising)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.teachingAdvising did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var teachingAdvising = req.teachingAdvising;

	teachingAdvising = _.extend(teachingAdvising, req.body.teachingAdvising);

	teachingAdvising.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teachingAdvising);
		}
	});
};

exports.readFromReport = function(req, res) {
	TeachingAdvising.findOne({report: req.report})
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
	res.jsonp(req.teachingAdvising);
};

exports.teachingAdvisingById = function(req, res, next, id) {
	TeachingAdvising.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, teachingAdvising) {
		if (err) return next(err);
		if (!teachingAdvising) return next(new Error('Failed to load TeachingAdvising ' + id));
		req.teachingAdvising = teachingAdvising;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.teachingAdvising.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};
