'use strict';

var mongoose = require('mongoose');
var EditorServiceReviewer = mongoose.model('EditorServiceReviewer');

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
			req.report.editorServiceReviewer = editorServiceReviewer;
			req.report.save();
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
			message: 'req.body.editorServiceReviewer did not get sent to backend',
			changes: 'No Changes Made'
		});
	}

	var ESR = req.editorServiceReviewer;
	//EDIT HERE

	ESR = _.extend(ESR, req.body.editorServiceReviewer);

	ESR.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ESR);
		}
	});
};

exports.readFromReport = function(req, res) {
	EditorServiceReviewer.findOne({report: req.report}, function(err, result) {
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
	.exec(function(err, editorServiceReviewer) {
		if (err) return next(err);
		if (!editorServiceReviewer) return next(new Error('Failed to load EditorServiceReviewer ' + id));
		req.editorServiceReviewer = editorServiceReviewer;
		next();
	});
};