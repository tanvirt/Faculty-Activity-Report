'use strict';

var mongoose = require('mongoose');
var Publication = mongoose.model('Publication');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.publication)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.publication did not get sent to backend',
			changes: 'No Publication Created'
		});
	}

	var publication = new Publication({
		info: req.body.publication.info,

		user: req.user,
		report: req.report
	});

	publication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(publication);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.publication)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.publication did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var publication = req.publication;

	publication = _.extend(publication, req.body.publication);

	publication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(publication);
		}
	});
};

exports.readFromReport = function(req, res) {
	Publication.find({report: req.report})
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
	res.jsonp(req.publication);
};

exports.publicationById = function(req, res, next, id) {
	Publication.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, publication) {
		if (err) return next(err);
		if (!publication) return next(new Error('Failed to load Publication ' + id));
		req.publication = publication;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.publication.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};
