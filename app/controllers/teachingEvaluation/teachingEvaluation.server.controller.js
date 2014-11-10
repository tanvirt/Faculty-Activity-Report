'use strict';

var mongoose = require('mongoose');
var TeachingEvaluation = mongoose.model('TeachingEvaluation');

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
	if (is.empty(req.body.teachingEvaluation)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.teachingEvaluation did not get send to backend',
			changes: 'No TeachingEvaluation Created'
		});
	}
	
	var sections = [];
	for(var iii=0; iii < req.body.teachingEvaluation.length; iii++){
		var path = req.body.teachingEvaluation[iii];
		var subdoc = {
			course: path.course,
			year: path.year,
			semester: path.semester,
			enrolled: path.enrolled,
			responses: path.responses,
			teacherMean: path.teacherMean,
			departmentMean: path.departmentMean,
			collegeMean: path.collegeMean
		};
		sections.push(subdoc);
	}
	
	var teachingEvaluation = new TeachingEvaluation({
		sub: sections,
		user: req.user,
		report: req.report
	});

	teachingEvaluation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teachingEvaluation);
		}
	});
};

exports.update = function(req, res) {
	if (is.empty(req.body.teachingEvaluation)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.teachingEvaluation did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var teachingEvaluation = req.teachingEvaluation;

	//I have my doubts about this correctly parsing through the teachingEvaluation array
	teachingEvaluation = _.extend(teachingEvaluation, req.body.teachingEvaluation); 

	teachingEvaluation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teachingEvaluation);
		}
	});
};

exports.readFromReport = function(req, res) {
	TeachingEvaluation.findOne({report: req.report}, function(err, result) { //One Teaching Evaluation holds all individual evaluations for the report
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.teachingEvaluation);
};

exports.teachingEvaluationById = function(req, res, next, id) {
	TeachingEvaluation.findById(id)
	.exec(function(err, teachingEvaluation) {
		if (err) return next(err);
		if (!teachingEvaluation) return next(new Error('Failed to load TeachingEvaluation ' + id));
		req.teachingEvaluation = teachingEvaluation;
		next();
	});
};