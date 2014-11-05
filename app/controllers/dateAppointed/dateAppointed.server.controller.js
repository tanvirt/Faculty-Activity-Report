'use strict';

var mongoose = require('mongoose');
var DateAppointed = mongoose.model('DateAppointed');

var modelClass = require('../../templates/modelClass');
var renderModel = new modelClass.RenderModel( DateAppointed, 'dateAppointed/dateAppointed.tex', 'dateAppointed/na.tex');

var errorHandler = require('../errors');

var is = require('is-js');

var _ = require('lodash');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	date: 'November 2012'
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

	if (is.empty(req.body.dateAppointed)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.dateAppointed did not get send to backend',
			changes: 'No DateAppointed Created'
		});
	}

	var dateAppointed = new DateAppointed({
		theDate: req.body.dateAppointed.date,
		user: req.user,
		report: req.report
	});

	dateAppointed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//req.report.dateAppointed = dateAppointed;
			//req.report.save();
			res.jsonp(dateAppointed);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.dateAppointed)) {
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.dateAppointed did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var dateAppointed = req.dateAppointed;

	dateAppointed = _.extend(dateAppointed, req.body.dateAppointed);

	dateAppointed.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(dateAppointed);
		}
	});
};

exports.readDateAppointed = function(req, res) {
	DateAppointed.findOne({report: req.report}, function(err, result) {
		res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.dateAppointed);
};

exports.dateAppointedById = function(req, res, next, id) {
	DateAppointed.findById(id)
	.exec(function(err, date) {
		if (err) return next(err);
		if (!date) return next(new Error('Failed to load Date Appointed ' + id));
		req.dateAppointed = date;
		next();
	});
};