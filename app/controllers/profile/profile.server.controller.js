'use strict';

var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');

var nameCtrl = require('../../controllers/name/name');
var tenureCtrl = require('../../controllers/tenure/tenure');

var async = require('async');

var path = require('path');
var join = path.join;
	
var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

/*
Gets the data from the frontend andk
saves it in the database.
*/
exports.create = function(req, res) {
	async.parallel([
		async.apply(nameCtrl.createJSON, req, res),
		async.apply(tenureCtrl.createJSON, req, res)
	], function(results) {
		console.log(results);
		res.jsonp(results);
	});
};

exports.update = function(req, res) {
	async.parallel([
		async.apply(nameCtrl.updateJSON, req, res),
		async.apply(tenureCtrl.updateJSON, req, res)
	], function(results) {
		res.jsonp(results.join(''));
	});
};

exports.readFromReport = function(req, res) {
	Profile.findOne({report: req.report})
	.populate('name')
	.populate('tenure')
	.exec(function(err, profile) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profile);
		}
	});


	/*
	async.parallel([
		async.apply(name.readFromReportJSON, req, res),
		async.apply(tenure.readFromReportJSON, req, res)
	], function(err, results) {
		if (err) return res.status(500).send({error: 'Profile Read failed'});
		res.jsonp(results.join(''));
	});
*/
};

exports.read = function(req, res) {
	async.parallel([
		async.apply(nameCtrl.readJSON, req, res),
		async.apply(tenureCtrl.readJSON, req, res)
	], function(results) {
		res.jsonp(results.join(''));
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