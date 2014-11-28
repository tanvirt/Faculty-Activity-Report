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
	renderModel.renderMultiple(req, callback);
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