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
	fs = require('fs'),
	async = require('async');

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

var inc = require('../templates/includes.js');

var Profile = mongoose.model('Profile');

var Name = mongoose.model('Name');
var Tenure = mongoose.model('Tenure');
var CurrentRank = mongoose.model('CurrentRank');
var DateAppointed = mongoose.model('DateAppointed');
var AffiliateAppointments = mongoose.model('AffiliateAppointments');

exports.getNew = function(req, res) {
	console.log(require('util').inspect(req.report));
	res.jsonp(req.report);
};

var renderName 								= require('../templates/name/renderName');
var renderTenure 							= require('../templates/tenure/renderTenure');
var renderDateAppointed 					= require('../templates/dateAppointed/renderDateAppointed');
var renderAssignedActivity					= require('../templates/assignedActivity/renderAssignedActivity');
var renderTeachingAdvising					= require('../templates/teachingAdvising/renderTeachingAdvising');
var renderTeachingEvaluation 				= require('../templates/teachingEvaluation/renderTeachingEvaluation');
var renderGraduateCommittee					= require('../templates/graduateCommittee/renderGraduateCommittee');
var renderCurrentRank 						= require('../templates/currentRank/renderCurrentRank');
var renderCreativeWorks						= require('../templates/creativeWorks/renderCreativeWorks');
var renderContribution 						= require('../templates/contribution/renderContribution');
var renderPatents 							= require('../templates/patents/renderPatents');
var renderContracts 						= require('../templates/contracts/renderContracts');
var renderAffiliateAppointments				= require('../templates/affiliateAppointments/renderAffiliateAppointments');
var renderPublication 						= require('../templates/publication/renderPublication');
var renderConferences 						= require('../templates/conferences/renderConferences');
var renderGovernance 						= require('../templates/governance/renderGovernance');
var renderConsultationsOutsideUniversity 	= require('../templates/consultationsOutsideUniversity/renderConsultationsOutsideUniversity');
var renderEditorServiceReviewer 			= require('../templates/editorServiceReviewer/renderEditorServiceReviewer');
var renderMembership 						= require('../templates/membership/renderMembership');
var renderInternational						= require('../templates/international/renderInternational');
var renderHonors 							= require('../templates/honors/renderHonors');
var renderFurtherInformationSection 		= require('../templates/furtherInformationSection/renderFurtherInformationSection');
var renderServiceToSchools 					= require('../templates/serviceToSchools/renderServiceToSchools');

exports.createNew = function(req, res) {
	var report = new Report();

	report.user = req.user;
	report.reportName = req.body.reportName;

	async.parallel({
		
		name: async.apply(renderName.createDefaultData, report, req.user),
		//tenure: async.apply(renderTenure.createDefaultData, report, req.user),
		//currentRank: async.apply(renderCurrentRank.createDefaultData, report, req.user),
		//affiliateAppointments: async.apply(renderAffiliateAppointments.createDefaultData, report, req.user),
		//dateAppointed: async.apply(renderDateAppointed.createDefaultData, report, req.user),
		//teachingAdvising: async.apply(renderTeachingAdvising.createDefaultData, report, req.user),
		//assignedActivity: async.apply(renderAssignedActivity.createDefaultData, report, req.user),
		//teachingEvaluation: async.apply(renderTeachingEvaluation.createDefaultData, report, req.user),
		//graduateCommittee: async.apply(renderGraduateCommittee.createDefaultData, report, req.user),
		//creativeWorks: async.apply(renderCreativeWorks.createDefaultData, report, req.user),
		//patents: async.apply(renderPatents.createDefaultData, report, req.user)//,
		/*publication: async.apply(renderPublication.createDefaultData, report, req.user),
		contribution: async.apply(renderContribution.createDefaultData, report, req.user),
		conferences: async.apply(renderConferences.createDefaultData, report, req.user),
		contracts: async.apply(renderContracts.createDefaultData, report, req.user),
		governance: async.apply(renderGovernance.createDefaultData, report, req.user),
		consultationsOutsideUniversity: async.apply(renderConsultationsOutsideUniversity.createDefaultData, report, req.user),
		editorServiceReviewer: async.apply(renderEditorServiceReviewer.createDefaultData, report, req.user),
		membership: async.apply(renderMembership.createDefaultData, report, req.user),
		international: async.apply(renderInternational.createDefaultData, report, req.user),
		serviceToSchools: async.apply(renderServiceToSchools.createDefaultData, report, req.user),
		honors: async.apply(renderHonors.createDefaultData, report, req.user),
		furtherInformationSection: async.apply(renderFurtherInformationSection.createDefaultData, report, req.user)	*/
	}, function(err, models) {
		console.log(require('util').inspect(models));
		if (err) {
			return res.jsonp({
				title: 'Error',
				message: err
			});
		}

		report.name = models.name._id;
		//report.tenure = models.tenure._id;
		//report.currentRank = models.currentRank._id;
		//report.affiliateAppointments = models.affiliateAppointments._id;
		//report.dateAppointed = models.dateAppointed._id;
		//report.teachingAdvising = models.teachingAdvising._id;
		//report.assignedActivity = models.assignedActivity._id;
		//report.teachingEvaluation = models.teachingEvaluation._id;
		//report.graduateCommittee = models.graduateCommittee._id;
		//report.creativeWorks = models.creativeWorks._id;
		//report.patents = models.patents._id;
		/*report.publication = models.publication._id;
		report.contribution = models.contribution._id;
		report.conferences = models.conferences._id;
		report.contracts = models.contracts._id;
		report.governance = models.governance._id;
		report.consultationsOutsideUniversity = models.consultationsOutsideUniversity._id;
		report.editorServiceReviewer = models.editorServiceReviewer._id;
		report.membership = models.membership._id;
		report.international = models.international._id;
		report.serviceToSchools = models.serviceToSchools._id;
		report.honors = models.honors._id;
		report.furtherInformationSection = models.furtherInformationSection._id;*/

		report.save(function(err) {
			if (err) return res.jsonp(err);
			req.report = report;
			res.jsonp(report);
		});
	});

/*
	renderName.createDefaultData(report, req.user, function(err, model) {
		report.name = model._id;

		report.save(function(err) {
			if (err) return res.jsonp(err);
			req.report = report;
			res.jsonp(report);
		});
	});
*/

/*
	var name = new Name({
		firstName: 'MyFirstName',
		middleName: 'M',
		lastName: 'MyLastName',

		report: report,
		user: req.user
	});

	var tenure = new Tenure({
		tenure: 'Not Tenured',

		report: report,
		user: req.user
	});

	var currentRank = new CurrentRank({
		rank: 'Professor',
		department: 'Agricultural and Biological Engineering',

		report: report,
		user: req.user
	});

	var dateAppointed = new DateAppointed({
		date: 'October 1993',

		report: report,
		user: req.user
	});

	var affiliateAppointments = new AffiliateAppointments({
		app: 'My AffiliateAppointments',

		report: report,
		user: req.user
	});

	var profile = new Profile({
		name: name,
		tenure: tenure,
		currentRank: currentRank,
		dateAppointed: dateAppointed,
		affiliateAppointments: affiliateAppointments,

		report: report,
		user: req.user
	});

	name.save();
	tenure.save();
	currentRank.save();
	dateAppointed.save();
	affiliateAppointments.save();

	profile.save();

	report.name = name._id;
	report.tenure = tenure._id;
	report.currentRank = currentRank._id;
	report.dateAppointed = dateAppointed._id;
	report.affiliateAppointments = affiliateAppointments._id;

	report.profile = profile._id;

	report.save(function(err) {
		if (err) return res.jsonp(err);
		req.report = report;
		res.jsonp(report);
	});
*/
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

	.populate('profile')

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

	.populate('profile')

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
