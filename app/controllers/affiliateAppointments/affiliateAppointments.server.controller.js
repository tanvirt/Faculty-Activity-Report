'use strict';

var mongoose = require('mongoose');
var AffiliateAppointments = mongoose.model('affiliateAppointments');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

/*
Gets the data from the frontend and
saves it in the database.
*/
exports.create = function(req, res) {
	if (is.empty(req.body.affiliateAppointments)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.affiliateAppointments did not get send to backend',
			changes: 'No AffiliateAppointments Created'
		});
	}

	var affiliateAppointments = new AffiliateAppointments({
		app: req.body.affiliateAppointments.appointments,
		user: req.user,
		report: req.report
	});

	affiliateAppointments.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//req.report.affiliateAppointments = affiliateAppointments;
			//req.report.save();
			res.jsonp(affiliateAppointments);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.affiliateAppointments)) {
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.affiliateAppointments did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var affiliateAppointments = req.affiliateAppointments;

	affiliateAppointments = _.extend(affiliateAppointments, req.body.affiliateAppointments);

	affiliateAppointments.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(affiliateAppointments);
		}
	});
};

exports.readFromReport = function(req, res) {
	AffiliateAppointments.findOne({report: req.report}, function(err, result) {
		res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.affiliateAppointments);
};

exports.affiliateAppointmentsById = function(req, res, next, id) {
	AffiliateAppointments.findById(id)
	.exec(function(err, affiliateAppointments) {
		if (err) return next(err);
		if (!affiliateAppointments) return next(new Error('Failed to load AffiliateAppointments ' + id));
		req.affiliateAppointments = affiliateAppointments;
		next();
	});
};