'use strict';

var mongoose = require('mongoose');
var Patents = mongoose.model('Patents');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.patents)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.patents did not get send to backend',
			changes: 'No Patents Created'
		});
	}

	var patent = new Patents({
		title: req.body.patents.title,
		authors: req.body.patents.authors,
		patentNumber: req.body.patents.patentNumber,
		date: req.body.patents.date,
		description: req.body.patents.description,

		user: req.user,
		report: req.report
	});

	patent.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.report.patents = patent;
			req.report.save();
	
			res.jsonp(patent);
		}
	});

};

exports.update = function(req, res) {
	console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.patents)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.patents did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var patents = req.patents;

	patents = _.extend(patents, req.body.patents);

	patents.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(patents);
		}
	});
};

exports.readFromReport = function(req, res) {
	Patents.find({report: req.report}, function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.patents);
};

exports.patentsById = function(req, res, next, id) {
	Patents.findById(id)
	.exec(function(err, patents) {
		if (err) return next(err);
		if (!patents) return next(new Error('Failed to load Patents ' + id));
		req.patents = patents;
		next();
	});
};