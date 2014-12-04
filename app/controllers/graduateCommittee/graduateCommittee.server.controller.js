'use strict';

var mongoose = require('mongoose');
var GraduateCommittee = mongoose.model('GraduateCommittee');

var errorHandler = require('../errors');

var is = require('is-js');

var path = require('path');
var join = path.join;

var _ = require('lodash');

var u = require('underscore');

/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.graduateCommittee)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.graduateCommittee did not get send to backend',
			changes: 'No GraduateCommittee Created'
		});
	}
	
	var graduateCommittee = new GraduateCommittee({
		role: req.body.graduateCommittee.role,
		studentName: req.body.graduateCommittee.studentName,
		degree: req.body.graduateCommittee.degree,
		major: req.body.graduateCommittee.major,
		degreeDate: req.body.graduateCommittee.degreeDate, 
			
		user: req.user,
		report: req.report
	});

	graduateCommittee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(graduateCommittee);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.graduateCommittee)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.graduateCommittee did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var graduateCommittee = req.graduateCommittee;

	graduateCommittee = _.extend(graduateCommittee, req.body.graduateCommittee);

	graduateCommittee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(graduateCommittee);
		}
	});
};

exports.readFromReport = function(req, res) {
	GraduateCommittee.find({report: req.report})
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, result) { //Returns an array
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.graduateCommittee);
};

exports.graduateCommitteeById = function(req, res, next, id) {
	GraduateCommittee.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, graduateCommittee) {
		if (err) return next(err);
		if (!graduateCommittee) return next(new Error('Failed to load GraduateCommittee ' + id));
		req.graduateCommittee = graduateCommittee;
		next();
	});
};

exports.delete = function(req, res) {
	var graduateCommittee = req.graduateCommittee;

	graduateCommittee.removeCount();

	graduateCommittee.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(graduateCommittee);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.graduateCommittee.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};