'use strict';

var mongoose = require('mongoose');
var Name = mongoose.model('Name');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

exports.create = function(req, res, callback) {
	if (is.empty(req.body.name)) {
		res.status(400);
		return callback({
			err: 'Post (create): Does not exist',
			message: 'req.body.name did not get send to backend',
			changes: 'No Name Created'
		});
	}

	var name = new Name({
		firstName: req.body.name.firstName,
		middleName: req.body.name.middleName,
		lastName: req.body.name.lastName,
		user: req.user,
		report: req.report
	});

	name.save(function(err) {
		callback(err, name);
	});
};

exports.update = function(req, res, callback) {
	if (is.empty(req.body.name)) {
		res.status(400);
		return callback({
			err: 'Put (update): Does not exist',
			message: 'req.body.name did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	Name.findById(req.profile.name, function(err, model) {
		if (err) {
			return callback(null, null);
		}

		var name = _.extend(model, req.body.name);
		name.save(function(err) {
			callback(err, name);
		});
	});
};