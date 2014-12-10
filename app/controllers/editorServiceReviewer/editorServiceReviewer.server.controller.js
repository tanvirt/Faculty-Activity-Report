'use strict';

var mongoose = require('mongoose');
var EditorServiceReviewer = mongoose.model('EditorServiceReviewer');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.editorServiceReviewer)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.editorServiceReviewer did not get sent to backend',
			changes: 'No EditorServiceReviewer Created'
		});
	}

	var editorServiceReviewer = new EditorServiceReviewer({
		info: req.body.editorServiceReviewer.info,

		user: req.user,
		report: req.report
	});

	editorServiceReviewer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(editorServiceReviewer);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.editorServiceReviewer)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.editorServiceReviewer did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var editorServiceReviewer = req.editorServiceReviewer;

	editorServiceReviewer = _.extend(editorServiceReviewer, req.body.editorServiceReviewer);

	editorServiceReviewer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(editorServiceReviewer);
		}
	});
};

exports.readFromReport = function(req, res) {
	EditorServiceReviewer.findOne({report: req.report})
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
	res.jsonp(req.editorServiceReviewer);
};

exports.editorServiceReviewerById = function(req, res, next, id) {
	EditorServiceReviewer.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, editorServiceReviewer) {
		if (err) return next(err);
		if (!editorServiceReviewer) return next(new Error('Failed to load EditorServiceReviewer ' + id));
		req.editorServiceReviewer = editorServiceReviewer;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.editorServiceReviewer.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};