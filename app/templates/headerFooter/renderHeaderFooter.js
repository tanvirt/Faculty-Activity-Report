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
