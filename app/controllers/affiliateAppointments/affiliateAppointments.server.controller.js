'use strict';

var mongoose = require('mongoose');
var AffiliateAppointments = mongoose.model('affiliateAppointments');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

exports.create = function(req, res, callback) {
	if (is.empty(req.body.affiliateAppointments)) {
		res.status(400);
		return callback({
			err: 'Post (create): Does not exist',
			message: 'req.body.affiliateAppointments did not get send to backend',
			changes: 'No AffiliateAppointments Created'
		});
	}

	var affiliateAppointments = new AffiliateAppointments({
		app: req.body.affiliateAppointments.app,
		user: req.user,
		report: req.report
	});

	affiliateAppointments.save(function(err) {
		callback(err, affiliateAppointments);
	});
};

exports.update = function(req, res, callback) {
	if (is.empty(req.body.affiliateAppointments)) {
		res.status(400);
		return callback({
			err: 'Put (update): Does not exist',
			message: 'req.body.affiliateAppointments did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	AffiliateAppointments.findById(req.profile.affiliateAppointments, function(err, model) {
		if (err) {
			res.status(400);
			return callback({
				err: 'Finding Failed'
			});
		}

		var affiliateAppointments = _.extend(model, req.body.affiliateAppointments);
		affiliateAppointments.save(function(err) {
			callback(err, affiliateAppointments);
		});
	});
};