'use strict';

var swig = require('swig'),
	async = require('async');

var latex = require('latex'),
	fs = require('fs'),
	async = require('async'),
	path = require('path'),
	join = path.join;

var renderName 								= require('../name/renderName');
var renderTenure 							= require('../tenure/renderTenure');
var renderDateAppointed 					= require('../dateAppointed/renderDateAppointed');
var renderAssignedActivity					= require('../assignedActivity/renderAssignedActivity');
var renderTeachingAdvising					= require('../teachingAdvising/renderTeachingAdvising');
var renderTeachingEvaluation 				= require('../teachingEvaluation/renderTeachingEvaluation');
var renderGraduateCommittee					= require('../graduateCommittee/renderGraduateCommittee');
var renderCurrentRank 						= require('../currentRank/renderCurrentRank');
var renderCreativeWorks						= require('../creativeWorks/renderCreativeWorks');
var renderContribution 						= require('../contribution/renderContribution');
var renderPatents 							= require('../patents/renderPatents');
var renderContracts 						= require('../contracts/renderContracts');
var renderAffiliateAppointments				= require('../affiliateAppointments/renderAffiliateAppointments');
var renderPublication 						= require('../publication/renderPublication');
var renderConferences 						= require('../conferences/renderConferences');
var renderGovernance 						= require('../governance/renderGovernance');
var renderConsultationsOutsideUniversity 	= require('../consultationsOutsideUniversity/renderConsultationsOutsideUniversity');
var renderEditorServiceReviewer 			= require('../editorServiceReviewer/renderEditorServiceReviewer');
var renderMembership 						= require('../membership/renderMembership');
var renderInternational						= require('../international/renderInternational');
var renderHonors 							= require('../honors/renderHonors');
var renderFurtherInformationSection 		= require('../furtherInformationSection/renderFurtherInformationSection');
var renderServiceToSchools 					= require('../serviceToSchools/renderServiceToSchools');

function render(input, cb) {
	swig.renderFile('./app/templates/headerFooter/headerFooter.tex', {
		results: input.join('')
	}, cb);
}

exports.renderSections = function(req, cb) {
	async.parallel([
		async.apply(renderName.render, req),
		async.apply(renderTenure.render, req),
		async.apply(renderCurrentRank.render, req),
		async.apply(renderAffiliateAppointments.render, req),
		async.apply(renderDateAppointed.render, req),
		async.apply(renderTeachingAdvising.render, req),
		async.apply(renderAssignedActivity.render, req),
		async.apply(renderTeachingEvaluation.render, req),
		async.apply(renderGraduateCommittee.render, req),
		async.apply(renderCreativeWorks.render, req),
		async.apply(renderPatents.render, req),
		async.apply(renderPublication.render, req),
		async.apply(renderContribution.render, req),
		async.apply(renderConferences.render, req),
		async.apply(renderContracts.render, req),
		async.apply(renderGovernance.render, req),
		async.apply(renderConsultationsOutsideUniversity.render, req),
		async.apply(renderEditorServiceReviewer.render, req),
		async.apply(renderMembership.render, req),
		async.apply(renderInternational.render, req),
		async.apply(renderServiceToSchools.render, req),
		async.apply(renderHonors.render, req),
		async.apply(renderFurtherInformationSection.render, req)	
	], function(err, results) {
		if (err) {
			return cb(err, null);
		}

		render(results, function(err, output) {
			cb(err, output);
		});
	});
};

exports.defaultValues = function(report, profile, user, cb) {
	async.parallel({	
		name: async.apply(renderName.createDefaultData, report, user),
		tenure: async.apply(renderTenure.createDefaultData, report, user),
		currentRank: async.apply(renderCurrentRank.createDefaultData, report, user),
		affiliateAppointments: async.apply(renderAffiliateAppointments.createDefaultData, report, user),
		dateAppointed: async.apply(renderDateAppointed.createDefaultData, report, user),
		teachingAdvising: async.apply(renderTeachingAdvising.createDefaultData, report, user),
		assignedActivity: async.apply(renderAssignedActivity.createDefaultData, report, user),
		teachingEvaluation: async.apply(renderTeachingEvaluation.createDefaultData, report, user),
		graduateCommittee: async.apply(renderGraduateCommittee.createDefaultData, report, user),
		creativeWorks: async.apply(renderCreativeWorks.createDefaultData, report, user),
		patents: async.apply(renderPatents.createDefaultData, report, user),
		publication: async.apply(renderPublication.createDefaultData, report, user),
		contribution: async.apply(renderContribution.createDefaultData, report, user),
		conferences: async.apply(renderConferences.createDefaultData, report, user),
		contracts: async.apply(renderContracts.createDefaultData, report, user),
		governance: async.apply(renderGovernance.createDefaultData, report, user),
		consultationsOutsideUniversity: async.apply(renderConsultationsOutsideUniversity.createDefaultData, report, user),
		editorServiceReviewer: async.apply(renderEditorServiceReviewer.createDefaultData, report, user),
		membership: async.apply(renderMembership.createDefaultData, report, user),
		international: async.apply(renderInternational.createDefaultData, report, user),
		serviceToSchools: async.apply(renderServiceToSchools.createDefaultData, report, user),
		honors: async.apply(renderHonors.createDefaultData, report, user),
		furtherInformationSection: async.apply(renderFurtherInformationSection.createDefaultData, report, user)	
	}, function(err, models) {
		if (err) {
			return cb({
				title: 'Error',
				message: err
			});
		}

		profile.name = models.name._id;
		profile.tenure = models.tenure._id;
		profile.dateAppointed = models.dateAppointed._id;
		profile.currentRank = models.currentRank._id;
		profile.affiliateAppointments = models.affiliateAppointments._id;

		report.name = models.name._id;
		report.tenure = models.tenure._id;
		report.currentRank = models.currentRank._id;
		report.affiliateAppointments = models.affiliateAppointments._id;
		report.dateAppointed = models.dateAppointed._id;
		report.teachingAdvising = models.teachingAdvising._id;
		report.assignedActivity = models.assignedActivity._id;
		report.teachingEvaluation = models.teachingEvaluation._id;
		report.graduateCommittee = models.graduateCommittee._id;
		report.creativeWorks = models.creativeWorks._id;
		report.patents = models.patents._id;
		report.publication = models.publication._id;
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
		report.furtherInformationSection = models.furtherInformationSection._id;

		report.save(function(err) {
			profile.save(function(err) {
				cb(err);
			});
		});
	});
};
