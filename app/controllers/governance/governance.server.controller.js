'use strict';

var mongoose = require('mongoose');
var Governance = mongoose.model('Governance');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.governance)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.governance did not get sent to backend',
			changes: 'No Governance Created'
		});
	}

	var governance = new Governance({
		info: req.body.governance.info,

		user: req.user,
		report: req.report
	});

	governance.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(governance);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.governance)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.governance did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var governance = req.governance;

	governance = _.extend(governance, req.body.governance);

	governance.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(governance);
		}
	});
};

exports.readFromReport = function(req, res) {
	Governance.find({report: req.report})
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
	res.jsonp(req.governance);
};

exports.governanceById = function(req, res, next, id) {
	Governance.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, governance) {
		if (err) return next(err);
		if (!governance) return next(new Error('Failed to load Governance ' + id));
		req.governance = governance;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.governance.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};
