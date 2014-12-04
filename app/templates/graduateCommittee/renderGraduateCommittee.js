'use strict';

var mongoose = require('mongoose');
var modelClass = require('../modelClass');

// Compile Schema into Model here
var GraduateCommittee = mongoose.model('GraduateCommittee');
var renderModel = new modelClass.RenderModel(GraduateCommittee, 'graduateCommittee/graduateCommittee.tex', 'graduateCommittee/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

renderModel.setDebugPopulate(false, {
	role: 'Chair',
	studentName: 'studentTestName01',
	degree: 'M.S.',
	major: 'Computer Science',
	degreeDate: '10/10/1990'
});

renderModel.isDebugNull = false;


module.exports.render = function (req, callback) {
	renderModel.renderMultipleGrad(req, callback, function( arrayOfObjs ) {

		var c = {};

		c.total = 0;
		c.chair = 0;
		c.coChair = 0;
		c.externalMember = 0;
		c.member = 0;
		c.minor = 0;

		for (var i=0; i<arrayOfObjs.length; i++) {
			c.total++;

			switch ( arrayOfObjs[i].role ) {
				case 'Chair':
					c.chair++;
					break;
				case 'Co-Chair':
					c.coChair++;
					break;
				case 'External':
					c.externalMember++;
					break;
				case 'Member':
					c.member++;
					break;
				case 'Minor':
					c.minor++;
					break;
				default:
					throw new Error('Role is not defined');
			}
		}

		return {array: arrayOfObjs, count: c};
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var graduateCommittee;

	for (var i=0; i<defaultData.graduateCommittee.length; i++) {
		var save = _.extend(defaultData.graduateCommittee[i], {
			report: report,
			user: user
		});

		graduateCommittee = new GraduateCommittee(save);
		graduateCommittee.save();
	}	

	cb(null, graduateCommittee);
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPreviousMult(GraduateCommittee, {graduateCommittee: undefined}, report, user, prevId, cb);
};
