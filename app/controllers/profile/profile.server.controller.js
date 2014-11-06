'use strict';

var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');

var nameCtrl = require('../../controllers/name/name');
var tenureCtrl = require('../../controllers/tenure/tenure');
var currentRankCtrl = require('../../controllers/currentRank/currentRank');
var dateAppointedCtrl = require('../../controllers/dateAppointed/dateAppointed');
var affiliateAppointmentsCtrl = require('../../controllers/affiliateAppointments/affiliateAppointments');

var async = require('async');
	
var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

/*
Gets the data from the frontend andk
saves it in the database.
*/
exports.create = function(req, res) {
	async.parallel({
		name: async.apply(nameCtrl.create, req, res),
		tenure: async.apply(tenureCtrl.create, req, res),
		currentRank: async.apply(currentRankCtrl.create, req, res),
		dateAppointed: async.apply(dateAppointedCtrl.create, req, res),
		affiliateAppointments: async.apply(affiliateAppointmentsCtrl.create, req, res)
	}, function(err, models) {
		if (err) return err;

		var profile = new Profile({
			name: models.name._id,
			tenure: models.tenure._id,
			currentRank: models.currentRank._id,
			dateAppointed: models.dateAppointed._id,
			affiliateAppointments: models.affiliateAppointments._id,

			user: req.user,
			report: req.report
		});

		profile.save(function(err) {
			res.jsonp(profile);
		});
	});	
};

exports.update = function(req, res) {
	async.parallel({
		name: async.apply(nameCtrl.update, req, res),
		tenure: async.apply(tenureCtrl.update, req, res),
		currentRank: async.apply(currentRankCtrl.update, req, res),
		dateAppointed: async.apply(dateAppointedCtrl.update, req, res),
		affiliateAppointments: async.apply(affiliateAppointmentsCtrl.update, req, res)
	}, function(err, results) {
		if (err) return err;

		console.log(results);

		var profile = req.profile;

		profile = _.extend(profile, req.body.profile);

		profile.save(function(err) {
			res.jsonp(profile);
		});
	});
};

exports.read = function(req, res) {
	Profile.findOne({report: req.report})
	.populate('name')
	.populate('tenure')
	.populate('currentRank')
	.populate('dateAppointed')
	.populate('affiliateAppointments')
	.exec(function(err, profile) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profile);
		}
	});
};

exports.profileById = function(req, res, next, id) {
	Profile.findById(id)
	.exec(function(err, profile) {
		if (err) return next(err);
		if (!profile) return next(new Error('Failed to load Profile ' + id));
		req.profile = profile;
		next();
	});
};