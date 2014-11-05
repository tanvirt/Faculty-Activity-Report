'use strict';

var mongoose = require('mongoose');
var CurrentRank = mongoose.model('currentRank');

var modelClass = require('../../templates/modelClass');
var renderModel = new modelClass.RenderModel( CurrentRank, 'currentRank/currentRank.tex', 'currentRank/na.tex');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	rank: 'faculty'
});

/*
will explicitly print the N/A latex
to the screen for debugging purposes
*/
renderModel.isDebugNull = false;

/*
render function that finds the obj in the database
and converts it into latex.
*/
exports.render = function(req, callback) {
	renderModel.render(req, callback);
};

/*
Gets the data from the frontend and
saves it in the database.
*/
exports.create = function(req, res) {
	console.log(require('util').inspect(req.report));

	if (is.empty(req.body.currentRank)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.currentRank did not get send to backend',
			changes: 'No CurrentRank Created'
		});
	}

	var currentRank = new CurrentRank({
		rank: req.body.currentRank.rank,
		department: req.body.currentRank.department,
		user: req.user,
		report: req.report
	});

	currentRank.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//req.report.currentRank = currentRank;
			//req.report.save();
			res.jsonp(currentRank);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.currentRank)) {
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.currentRank did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var currentRank = req.currentRank;

	currentRank = _.extend(currentRank, req.body.currentRank);

	currentRank.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(currentRank);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.currentRank);
};

exports.readCurrentRank = function(req, res) {
	CurrentRank.findOne({report: req.report}, function(err, result) {
		res.jsonp(result);
	});
};

exports.currentRankById = function(req, res, next, id) {
	CurrentRank.findById(id)
	.exec(function(err, currentRank) {
		if (err) return next(err);
		if (!currentRank) return next(new Error('Failed to load CurrentRank ' + id));
		req.currentRank = currentRank;
		next();
	});
};