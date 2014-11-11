'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Report = mongoose.model('Report'),
	_ = require('lodash'),
	u = require('underscore');

//load in functions from previous controller
var rCtrl = require('./report');
//make available to routes
exports.rCtrl = rCtrl;

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
	rCtrl.submit_02(req, res, function(err, models) {
		if (err) {

			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var report = new Report();
			report.user = req.user;

			// Assign Prev values
			report.reportName = req.body.reportName;

			// Assign References References
			if (models.name)
				report.name = models.name._id;
			if (models.tenure)
				report.tenure = models.tenure._id;
			if (models.currentRank)
				report.currentRank = models.currentRank._id;
			if (models.affiliateAppointments)
				report.affiliateAppointments = models.affiliateAppointments._id;
			if (models.assignedActivity)
				report.assignedActivity = models.assignedActivity._id;
			if (models.dateAppointed)
				report.dateAppointed = models.dateAppointed._id;
			if (models.teachingAdvising)
				report.teachingAdvising = models.teachingAdvising._id;
			if (models.contribution)
				report.contribution = models.contribution._id;
			if (models.international)
				report.international = models.international._id;
			if (models.membership)
				report.membership = models.membership._id;
			if (models.teachingEvaluation)
				report.teachingEvaluation = models.teachingEvaluation._id;
			if (models.conferences)
				report.conferences = models.conferences._id;
			if(models.contracts)
				report.contracts = models.contracts._id;
			if (models.graduateCommittee)
				report.graduateCommittee = models.graduateCommittee._id;
			if (models.creativeWorks)
				report.creativeWorks = models.creativeWorks._id;
			if (models.patents)
				report.patents = models.patents._id;
			if (models.honors)
				report.honors = models.honors._id;				
			if (models.furtherInformationSection)
				report.furtherInformationSection = models.furtherInformationSection._id;				
			if (models.consultationsOutsideUniversity)
				report.consultationsOutsideUniversity = models.consultationsOutsideUniversity._id;				
			if (models.serviceToSchools)
				report.serviceToSchools = models.serviceToSchools._id;
			if (models.governance)
				report.governance = models.governance._id;
			if (models.editorServiceReviewer)
				report.editorServiceReviewer = models.editorServiceReviewer._id;
				
			report.save(function(err) {
				if (err) {
					console.log(err);
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					//Now that report is saved, assign reference
					if (models.name)
						models.name.report = report;

					//models.teachingEvaluation.report = report;
					if (models.tenure)
						models.tenure.report = report;
					if (models.currentRank)
						models.currentRank.report = report;
					if (models.dateAppointed)
						models.dateAppointed.report =  report;
					if (models.affiliateAppointments)
						models.affiliateAppointments.report = report;
					if (models.assignedActivity)
						models.assignedActivity.report = report;
					if (models.teachingAdvising)
						models.teachingAdvising.report = report;
					if (models.contribution)
						models.contribution.report = report;
					if (models.international)
						models.international.report = report;
					if (models.membership)
						models.membership.report = report;
					if (models.teachingEvaluation)
						models.teachingEvaluation.report = report;
					if (models.conferences)
						models.conferences.report = report;
					if (models.contracts)
						models.contracts.report = report;
					if (models.graduateCommittee)
						models.graduateCommittee.report = report;
					if (models.creativeWorks)
						models.creativeWorks.report = report;
					if (models.patents)
						models.patents.report = report;
					if (models.honors)
						models.honors.report = report;					
					if (models.furtherInformationSection)
						models.furtherInformationSection.report = report;					
					if (models.consultationsOutsideUniversity)
						models.consultationsOutsideUniversity.report = report;	
					if (models.serviceToSchools)
						models.serviceToSchools.report = report;						
					if (models.governance)
						models.governance.report = report;
					if (models.editorServiceReviewer) 
						models.editorServiceReviewer.report = report;
						
					
					//Update existing document
					if (models.name) {
						models.name.save(function(err) {

							//console.log('Name Saved');
							/*if (err) {
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)});
							}*/						
						});
					}

					//models.teachingEvaluation.save(function(err) {
					//	if (err) console.log(err);
					//});

					if (models.tenure) {
						models.tenure.save(function(err) {
							//console.log('Tenure Saved');
						});
					}

					if (models.currentRank) {
						models.currentRank.save(function(err) {
							//console.log('CurrentRank Saved');
						});
					}

					if (models.dateAppointed) {
						models.dateAppointed.save(function(err) {
							//console.log('DateAppointed Saved');
						});
					}

					if (models.affiliateAppointments) {
						models.affiliateAppointments.save(function(err) {
							//console.log('AffiliateAppointments Saved');
						});
					}	

					if (models.assignedActivity) {				
						models.assignedActivity.save(function(err) {
							//console.log('AssignedActivity Saved');
						});
					}

					if (models.teachingAdvising) {
						models.teachingAdvising.save(function(err) {
							//console.log('TeachingAdvising Saved');
						});
					}

					if (models.contribution) {
						models.contribution.save(function(err) {
							//console.log('Contribution Saved');
						});
					}

					if (models.international) {
						models.international.save(function(err) {
							//console.log('International Saved');
						});
					}

					if (models.membership) {
						models.membership.save(function(err) {
							//console.log('Membership Saved');
						});
					}

					if (models.teachingEvaluation) {
						models.teachingEvaluation.save(function(err) {

						});
					}

					if (models.conferences) {
						models.conferences.save(function(err) {
							//console.log('conferences saved');
						});
					}
					
					if (models.contracts) {
						models.contracts.save(function(err) {
							//console.log('contracts saved');
						});
					}

					if (models.graduateCommittee) {
						models.graduateCommittee.save(function(err) {

						});
					}

					if (models.creativeWorks) {
						models.creativeWorks.save(function(err) {

						});
					}

					if (models.patents) {
						models.patents.save(function(err) {

						});
					}

					if (models.honors) {
						models.honors.save(function(err) {

						});
					}

					if (models.furtherInformationSection) {
						models.furtherInformationSection.save(function(err) {

						});
					}

					if (models.consultationsOutsideUniversity) {
						models.consultationsOutsideUniversity.save(function(err) {

						});
					}
					
					if (models.serviceToSchools) {
						models.serviceToSchools.save(function(err) {

						});
					}
					
					if (models.governance) {
						models.governance.save(function(err) {
						
						});
					}
					
					if (models.editorServiceReviewer) {
						models.editorServiceReviewer.save(function(err) {
						
						});
					}
					
					
					
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
	
	
	//.populate('teachingEvaluation')

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
	if (req.report.user.id !== req.user.id || req.user.type.contains('admin')) {
		return res.status(403).send('User is not authorized');
	}

	next();
};
