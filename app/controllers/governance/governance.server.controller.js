'use strict';

/*jshint expr: true*/

var mongoose = require('mongoose');
var Governance = mongoose.model('Governance');

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
	if (is.empty(req.body.governance)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.governance did not get sent to backend',
			changes: 'No governance Created'
		});
	}

	var governance = new Governance({
		govStr: req.body.governance.govStr,

		user: req.user,
		report: req.report
	});

	governance.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.report.governance = governance;
			req.report.save();
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
			message: 'req.body.governance did not get sent to backend',
			changes: 'No Changes Made'
		});
	}

	var gov = req.governance;
	//EDIT HERE

	gov = _.extend(gov, req.body.governance);

	gov.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gov);
		}
	});
};

exports.readFromReport = function(req, res) {
	Governance.findOne({report: req.report}, function(err, result) {
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
	.exec(function(err, governance) {
		if (err) return next(err);
		if (!governance) return next(new Error('Failed to load governance ' + id));
		req.governance = governance;
		next();
	});
};