'use strict';

var mongoose = require('mongoose');
var Tenure = mongoose.model('Tenure');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

exports.create = function(req, res, callback) {
	if (is.empty(req.body.tenure)) {
		res.status(400);
		return callback({
			err: 'Post (create): Does not exist',
			message: 'req.body.tenure did not get send to backend',
			changes: 'No Tenure Created'
		});
	}

	var tenure = new Tenure({
		tenure: req.body.tenure.tenure,
		user: req.user,
		report: req.report
	});

	tenure.save(function(err) {
		callback(err, tenure);
	});
};

exports.update = function(req, res, callback) {
	if (is.empty(req.body.tenure)) {
		return callback({
			err: 'Put (update): Does not exist',
			message: 'req.body.tenure did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	Tenure.findById(req.profile.tenure, function(err, model) {
		if (err) return err;

		var tenure = _.extend(model, req.body.tenure);
		tenure.save(function(err) {
			callback(err, tenure);
		});
	});
};
