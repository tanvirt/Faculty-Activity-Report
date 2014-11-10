'use strict';

var mongoose = require('mongoose');
var GraduateCommittee = mongoose.model('GraduateCommittee');

var errorHandler = require('../errors');

var is = require('is-js');

var path = require('path');
var join = path.join;

var _ = require('lodash');

/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	//For now, this will work like other sections until excel parser is done
	if (is.empty(req.body.graduateCommittee)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.graduateCommittee did not get send to backend',
			changes: 'No GraduateCommittee Created'
		});
	}
	
	var sections = [];
	for (var iii = 0; iii < req.body.graduateCommittee.length; iii++) {
		var path = req.body.graduateCommittee[iii];
		var subdoc = {
			role: path.role,
			studentName: path.studentName,
			degree: path.degree,
			major: path.major,
			degreeDate: path.degreeDate
		};
		sections.push(subdoc);
	}
	
	var graduateCommittee = new GraduateCommittee({
		sub: sections,
		user: req.user,
		report: req.report
	});
	
	for (iii = 0; iii < req.body.graduateCommittee.length; iii++)
		graduateCommittee.incrementCount(iii);

		
		
	graduateCommittee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(graduateCommittee);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.graduateCommittee)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.graduateCommittee did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var graduateCommittee = req.graduateCommittee;

	//I know this is gonna screw up with the subsection array and counts for each role
	graduateCommittee = _.extend(graduateCommittee, req.body.graduateCommittee);

	graduateCommittee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(graduateCommittee);
		}
	});
};

exports.readFromReport = function(req, res) {
	//One Graduate Committee holds the entire chart of committees for the report
	GraduateCommittee.findOne({report: req.report}, function(err, result) { 
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.graduateCommittee);
};

exports.graduateCommitteeById = function(req, res, next, id) {
	GraduateCommittee.findById(id)
	.exec(function(err, graduateCommittee) {
		if (err) return next(err);
		if (!graduateCommittee) return next(new Error('Failed to load GraduateCommittee ' + id));
		req.graduateCommittee = graduateCommittee;
		next();
	});
};