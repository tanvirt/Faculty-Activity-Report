'use strict';

var mongoose = require('mongoose');
var Honors = mongoose.model('Honors');

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
	if (is.empty(req.body.honors)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.honors did not get sent to backend',
			changes: 'No Honors Created'
		});
	}

	var honors = new Honors({
		info: req.body.honors.info,

		user: req.user,
		report: req.report
	});

	honors.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.report.honors = honors;
			req.report.save();
			res.jsonp(honors);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.honors)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.honors did not get sent to backend',
			changes: 'No Changes Made'
		});
	}

	var honors = req.honors;

	honors = _.extend(honors, req.body.honors);

	honors.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(honors);
		}
	});
};

exports.readFromReport = function(req, res) {
	Honors.findOne({report: req.report}, function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.honors);
};

exports.honorsById = function(req, res, next, id) {
	Honors.findById(id)
	.exec(function(err, honors) {
		if (err) return next(err);
		if (!honors) return next(new Error('Failed to load Honors ' + id));
		req.honors = honors;
		next();
	});
};
