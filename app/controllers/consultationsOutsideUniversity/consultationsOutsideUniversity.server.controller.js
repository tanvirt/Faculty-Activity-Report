'use strict';

var mongoose = require('mongoose');
var ConsultationsOutsideUniversity = mongoose.model('ConsultationsOutsideUniversity');

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
			req.report.consultationsOutsideUniversity = consultationsOutsideUniversity;
			req.report.save();
			res.jsonp(consultationsOutsideUniversity);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.consultationsOutsideUniversity)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.consultationsOutsideUniversity did not get sent to backend',
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
	ConsultationsOutsideUniversity.findOne({report: req.report}, function(err, result) {
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
	.exec(function(err, consultationsOutsideUniversity) {
		if (err) return next(err);
		if (!consultationsOutsideUniversity) return next(new Error('Failed to load ConsultationsOutsideUniversity ' + id));
		req.consultationsOutsideUniversity = consultationsOutsideUniversity;
		next();
	});
};
