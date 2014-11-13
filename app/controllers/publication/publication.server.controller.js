'use strict';

var mongoose = require('mongoose');
var Publication = mongoose.model('Publication');

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
			req.report.publication = publication;
			req.report.save();
			res.jsonp(publication);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.publication)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.publication did not get sent to backend',
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
	Publication.findOne({report: req.report}, function(err, result) {
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
	.exec(function(err, publication) {
		if (err) return next(err);
		if (!publication) return next(new Error('Failed to load Publication ' + id));
		req.publication = publication;
		next();
	});
};