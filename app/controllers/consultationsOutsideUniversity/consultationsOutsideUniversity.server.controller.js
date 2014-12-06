'use strict';

var mongoose = require('mongoose');
var ConsultationsOutsideUniversity = mongoose.model('ConsultationsOutsideUniversity');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.consultationsOutsideUniversity)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.consultationsOutsideUniversity did not get sent to backend',
			changes: 'No ConsultationsOutsideUniversity Created'
		});
	}

	var consultationsOutsideUniversity = new ConsultationsOutsideUniversity({
		info: req.body.consultationsOutsideUniversity.info,

		user: req.user,
		report: req.report
	});

	consultationsOutsideUniversity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(consultationsOutsideUniversity);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.consultationsOutsideUniversity)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.consultationsOutsideUniversity did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var consultationsOutsideUniversity = req.consultationsOutsideUniversity;

	consultationsOutsideUniversity = _.extend(consultationsOutsideUniversity, req.body.consultationsOutsideUniversity);

	consultationsOutsideUniversity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(consultationsOutsideUniversity);
		}
	});
};

exports.readFromReport = function(req, res) {
	ConsultationsOutsideUniversity.find({report: req.report})
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
	res.jsonp(req.consultationsOutsideUniversity);
};

exports.consultationsOutsideUniversityById = function(req, res, next, id) {
	ConsultationsOutsideUniversity.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, consultationsOutsideUniversity) {
		if (err) return next(err);
		if (!consultationsOutsideUniversity) return next(new Error('Failed to load ConsultationsOutsideUniversity ' + id));
		req.consultationsOutsideUniversity = consultationsOutsideUniversity;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.consultationsOutsideUniversity.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};
