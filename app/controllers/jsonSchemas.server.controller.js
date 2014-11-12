'use strict';

var mongoose = require('mongoose'),
	JSONSchemas = mongoose.model('JSONSchemas'),
	is = require('is-js'),
	_ = require('lodash'),
	u = require('underscore'),
	errorHandler = require('./errors');

exports.read = function(req, res) {
	JSONSchemas.find(function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		res.jsonp(result);
	});
};

exports.create = function(req, res) {
	var jsonSchemas = new JSONSchemas(req.body);

	jsonSchemas.user = req.user;

	jsonSchemas.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.jsonp(jsonSchemas);
	});
};

exports.readById = function(req, res) {
	res.jsonp(req.jsonSchemas);
};

exports.update = function(req, res) {
	var jsonSchemas = req.jsonSchemas;

	jsonSchemas = _.extend(jsonSchemas, req.body);

	jsonSchemas.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jsonSchemas);
		}
	});
};

exports.delete = function(req, res) {
	var jsonSchemas = req.jsonSchemas;

	jsonSchemas.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jsonSchemas);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (!u.contains(req.user.roles, 'admin')) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.jsonById = function(req, res, next, id) {
	JSONSchemas.findById(id)
	.exec(function(err, result) {
		if (err) return next(err);
		if (!result) return next(new Error('Failed to load JSONSchema ' + id));
		req.jsonSchemas = result;
		next();
	});
};