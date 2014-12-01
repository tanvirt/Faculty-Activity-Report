'use strict';

var mongoose = require('mongoose');
var Contracts = mongoose.model('Contracts');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u  = require('underscore');

/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.contracts)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.contracts did not get send to backend',
			changes: 'No Contracts Created'
		});
	}

	var contracts = new Contracts({
		title: req.body.contracts.title,
		funded: req.body.contracts.funded,
		PI: req.body.contracts.PI,
		startDate: req.body.contracts.startDate,
		endDate: req.body.contracts.endDate,
		fundingAgency: req.body.contracts.fundingAgency,
		value: req.body.contracts.value,
		fundingPortion: req.body.contracts.fundingPortion,

		user: req.user,
		report: req.report
	});

	contracts.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.report.contracts = contracts;
			req.report.save();

			res.jsonp(contracts);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.contracts)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.contracts did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var contracts = req.contracts;

	contracts = _.extend(contracts, req.body.contracts);

	contracts.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contracts);
		}
	});
};

exports.readFromReport = function(req, res) {
	Contracts.find({report: req.report})
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
	res.jsonp(req.contracts);
};

exports.contractsById = function(req, res, next, id) {
	Contracts.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, contracts) {
		if (err) return next(err);
		if (!contracts) return next(new Error('Failed to load Contracts ' + id));
		req.contracts = contracts;
		next();
	});
};

exports.delete = function(req, res) {
	var contracts = req.contracts;

	contracts.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contracts);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.contracts.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};