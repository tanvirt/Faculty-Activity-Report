'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Report = mongoose.model('Report'),
	_ = require('lodash');



var rCtrl = require('./report');

/**
 * Create a Report
 */
exports.create = function(req, res) {
	//console.log('body: ' + req.body.firstName);
	rCtrl.submit_02(req, res, function(err, models) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var report = new Report();
			report.user = req.user;

			// Assign Prev values
			report.reportName = req.body.reportName;

			// Temporary Values, Delete when Reference has been made
			//report.firstName = req.body.firstName;
			//report.middleName = req.body.middleName;
			//report.lastName = req.body.lastName;
			//report.tenure = req.body.tenure;
			//report.currentRank = req.body.currentRank; //needs currentRank ref
			//report.dateAppointed = req.body.dateAppointed; //needs dateAppointed ref
			//report.affiliateAppointments = req.body.affiliateAppointments; //needs affiliate reff

			// Assign Name References
			report.name = models.name._id;

			// Assign Tenure References
			report.tenure = models.tenure._id;
			report.currentRank = models.currentRank._id;
			report.affiliateAppointments = models.affiliateAppointments._id;
			report.dateAppointed = models.dateAppointed._id;
			
			report.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					console.log(JSON.stringify(report));
					res.jsonp(report);
				}
			});			
		}
	}); 
};


/**
 * Show the current Report
 */
exports.read = function(req, res) {
	console.log('reading');
	res.jsonp(req.report);
	console.log('read ' + req.report);
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
	Report.find()
	.sort('-created')
	.populate('user', 'displayName')

	.populate('name')
	.populate('tenure')
	.populate('currentRank')
	.populate('affiliateAppointments')
	.populate('dateAppointed')

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
	.populate('dateAppointed')

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
	if (req.report.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};