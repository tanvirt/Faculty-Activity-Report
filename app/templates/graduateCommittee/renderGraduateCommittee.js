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

/*
function passObj(objArray)
{
	return {'committees': objArray, 'count': [1000, 1001, 1002, 1003, 1004, 1005]};
}
*/

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function (req, callback) {
	/*
	renderModel.renderMultiple( 'graduateCommittee/graduateCommittee.tex', graduateCommittee, { }, passObj,dummyObject, function ( renderStr ) {
		callback(null, renderStr);
	});
*/
	renderModel.render(req, callback);
};

module.exports.submit = function(req, callback) {
	//console.log(require('util').inspect(req.body.graduateCommittee));

	if (is.empty(req.body.graduateCommittee)) return callback(null, null);

	var graduate = new GraduateCommittee({
		sub: [],
		user: req.user
	});

	for (var i=0; i<req.body.graduateCommittee.length; i++) {
		var path = req.body.graduateCommittee[i];
		var subdoc = {
			role: path.role,
			studentName: path.studentName,
			degree: path.degree,
			major: path.major,
			degreeDate: path.degreeDate
		};
		
		graduate.sub.push(subdoc);
		graduate.incrementCount(i);
	}

	//console.log('Graduate: ' + graduate);

	graduate.save(function(err) {
		callback(err, graduate);
	});
/*
	graduateCommittee.create({
		role: req.body.graduateCommittee.role,
		studentName: req.body.graduateCommittee.studentName,
		degree: req.body.graduateCommittee.degree,
		major: req.body.graduateCommittee.major,
		degreeDate: req.body.graduateCommittee.degreeDate,
		user: req.user
	}, function(err) {
		callback(err);
	});
*/
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.graduateCommittee, {
		report: report,
		user: user
	});

	var graduateCommittee = new GraduateCommittee(save);

	graduateCommittee.save(function(err) {
		cb(err, graduateCommittee);
	});
};