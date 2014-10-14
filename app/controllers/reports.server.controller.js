'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Report = mongoose.model('Report'),
	_ = require('lodash');
var Name = mongoose.model('NameSchema');
var Tenure = mongoose.model('TenureSchema');

/**
 * Create a Report
 */
/*
module.exports.submit = function(req, res, callback) {
	Name.create({
		firstName: req.body.name.firstName,
		midInit: req.body.name.midInit,
		lastName: req.body.name.lastName,
		user: req.user
	}, function(err) {
		callback(err);
	});
};*/
 
 exports.create = function(req, res) {

	var report = new Report();
	report.user = req.user;

	var name = new Name();
	name.firstName = req.body.firstName;
	name.midInit =  req.body.midInit;
	name.lastName = req.body.lastName;
	name.user = req.user;
	
	/*
	var tenure = new Tenure();
	tenure.tenure = req.body.tenure;
	console.log('saved');
	
	tenure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tenure);
			console.log('saved3');
		}
	}); */
	name.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(name);
			console.log('saved2');
		}
	}); 
};

/**
 * Show the current Report
 */
exports.read = function(req, res) {
	console.log('reading');
	res.jsonp(req.report);
	console.log('read ' + req.report);
};

/**
 * Update a Report
 */
exports.update = function(req, res) {
	var report = req.report ;

	report = _.extend(report , req.body);

	report.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(report);
		}
	});
};

/**
 * Delete an Report
 */
exports.delete = function(req, res) {
	var report = req.report;

	report.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(report);
		}
	});
};

/**
 * List of Reports
 */
exports.list = function(req, res) { 
	Report.find().sort('-created').populate('user', 'displayName').exec(function(err, reports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reports);
		}
	});
};

/**
 * Report middleware
 */
exports.reportByID = function(req, res, next, id) { 
	Name.findById(id).populate('user', 'displayName').exec(function(err, report) {
		if (err) return next(err);
		//var newname = Name.find({_id: {_id: id}});
		if (!report) return next(new Error('Failed to load Report ' + id));
		req.report = report;
		next();
	});
};

/**
 * Report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.report.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};