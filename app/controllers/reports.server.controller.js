'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Report = mongoose.model('Report'),
	_ = require('lodash'),
	u = require('underscore'),
	latex = require('latex'),
	fs = require('fs');

var headerFooter = require('../templates/headerFooter/renderHeaderFooter');

exports.generateLatex = function(req, res, next) {
	headerFooter.renderSections(req, function(err, latex) {
		if (err) return res.jsonp(err);

		req.entireLatex = latex;

		next();
	});
};

exports.generatePDF = function(req, res, next) {
	var myStream = latex(req.entireLatex);

	var writeable = fs.createWriteStream('./public/modules/reports/pdf/' + req.report._id + '.pdf');

	myStream.pipe(writeable);

	myStream.on('error', function(err) {
		return res.jsonp(err);
	});

	writeable.on('finish', function() {
		console.log('Report Generated!');
		next();
	});
};

exports.getLatex = function(req, res) {
	res.jsonp(req.entireLatex);
};

exports.getPDF = function(req, res) {
	res.jsonp(req.entirePDF);
};

exports.download = function(req, res) {
	res.sendfile('./public/modules/reports/pdf/' + req.report._id + '.pdf');
};

exports.createBlank = function(req, res) {
	var report = new Report();

	report.user = req.user;
	report.reportName = req.body.reportName;

	report.save(function(err) {
		if (err) return res.jsonp(err);
		req.report = report;
		res.jsonp(report);
	});
};

/**
 * Create a Report
 */
exports.create = function(req, res) {
	var report = new Report();
	
	report.user = req.user;

	// Assign Prev values
	report.reportName = req.body.reportName;

	report.save(function(err) {
		res.jsonp(report);
	});
};

/**
 * Show the current Report
 */
exports.read = function(req, res) {
	res.jsonp(req.report);
};

/**
 * Update a Report
 */
exports.update = function(req, res) {
	var report = req.report;

	report = _.extend(report, req.body);

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
	var s_param = {user: req.user};

	if (u.contains(req.user.roles, 'admin')) {
		s_param = {};
	}

	Report.find(s_param)
	.sort('-created')
	.populate('user', 'displayName')

	.populate('name')
	.populate('tenure')
	.populate('currentRank')
	.populate('affiliateAppointments')
	.populate('assignedActivity')
	.populate('dateAppointed')
	.populate('teachingAdvising')
	.populate('contribution')
	.populate('international')
	.populate('membership')
	.populate('teachingEvaluation')
	.populate('conferences')
	.populate('contracts')
	.populate('graduateCommittee')
	.populate('creativeWorks')
	.populate('patents')
	.populate('honors')
	.populate('furtherInformationSection')
	.populate('consultationsOutsideUniversity')
	.populate('governance')
	.populate('publication')


	.exec(function(err, reports) {
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
	Report.findById(id)
	.populate('user', 'displayName')

	.populate('name')
	.populate('tenure')
	.populate('currentRank')
	.populate('affiliateAppointments')
	.populate('assignedActivity')
	.populate('dateAppointed')
	.populate('teachingAdvising')
	.populate('contribution')
	.populate('international')
	.populate('membership')
	.populate('teachingEvaluation')
	.populate('conferences')
	.populate('contracts')
	.populate('graduateCommittee')
	.populate('creativeWorks')
	.populate('patents')
	.populate('honors')
	.populate('furtherInformationSection')
	.populate('consultationsOutsideUniversity')
	.populate('governance')
	.populate('publication')
	
	
	.exec(function(err, report) {
		if (err) return next(err);
		if (!report) return next(new Error('Failed to load Report ' + id));
		req.report = report;
		next();
	});
};

/**
 * Report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.report.user.id !== req.user.id || u.contains(req.user.roles, 'admin')) {
		return res.status(403).send('User is not authorized');
	}

	next();
};
