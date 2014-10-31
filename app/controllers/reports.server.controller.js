'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Report = mongoose.model('Report'),
	_ = require('lodash');

//load in functions from previous controller
var rCtrl = require('./report');
//make available to routes
exports.rCtrl = rCtrl;

/**
 * Create a Report
 */
exports.create = function(req, res) {
	rCtrl.submit_02(req, res, function(err, models) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var report = new Report();
			report.user = req.user;

			//console.log(require('util').inspect(req.body));

			// Assign Prev values
			report.reportName = req.body.reportName;

			// Assign References References
			report.name = models.name._id;
			report.tenure = models.tenure._id;
			report.currentRank = models.currentRank._id;
			report.affiliateAppointments = models.affiliateAppointments._id;
			report.assignedActivity = models.assignedActivity._id;
			report.dateAppointed = models.dateAppointed._id;
			report.assignedActivity = models.assignedActivity._id;
			report.teachingAdvising = models.teachingAdvising._id;
			report.contribution = models.contribution._id;
			report.international = models.international._id;
			report.membership = models.membership._id;
			report.teachingEvaluation = models.teachingEvaluation._id;

			report.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					//Now that report is saved, assign reference
					models.name.report = report;
					models.tenure.report = report;
					models.currentRank.report = report;
					models.dateAppointed.report =  report;
					models.affiliateAppointments.report = report;
					models.assignedActivity.report = report;
					models.teachingAdvising.report = report;
					models.contribution.report = report;
					models.international.report = report;
					models.membership.report = report;
					models.teachingEvaluation.report = report;
					

					//Updatae existing document
					models.name.save(function(err) {
						//console.log('Name Saved');
					});
					models.tenure.save(function(err) {
						//console.log('Tenure Saved');
					});
					models.currentRank.save(function(err) {
						//console.log('CurrentRank Saved');
					});
					models.dateAppointed.save(function(err) {
						//console.log('DateAppointed Saved');
					});
					models.affiliateAppointments.save(function(err) {
						//console.log('AffiliateAppointments Saved');
					});					
					models.assignedActivity.save(function(err) {
						//console.log('AssignedActivity Saved');
					});
					models.teachingAdvising.save(function(err) {
						//console.log('TeachingAdvising Saved');
					});
					models.contribution.save(function(err) {
						//console.log('Contribution Saved');
					});
					models.international.save(function(err) {
						//console.log('International Saved');
					});
					models.membership.save(function(err) {
						//console.log('Membership Saved');
					});
					models.teachingEvaluation.save(function(err) {

					});

					//get json to frontend
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
	//console.log('reading');
	res.jsonp(req.report);
	//console.log(util.inspect(req));
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
	console.log('Backend Removed');
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
	.populate('assignedActivity')
	.populate('dateAppointed')
	.populate('assignedActivity')
	.populate('teachingAdvising')
	.populate('contribution')
	.populate('international')
	.populate('membership')
	.populate('teachingEvaluation')

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
	.populate('assignedActivity')
	.populate('teachingAdvising')
	.populate('contribution')
	.populate('international')
	.populate('membership')
	.populate('teachingEvaluation')

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
