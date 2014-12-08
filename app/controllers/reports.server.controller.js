'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Report = mongoose.model('Report'),
	Profile = mongoose.model('Profile'),
	_ = require('lodash'),
	u = require('underscore'),
	latex = require('latex'),
	fs = require('fs'),
	async = require('async'),
	spawn = require('child_process').spawn,
	join = require('path').join,
	crypto = require('crypto');

var headerFooter = require('../templates/headerFooter/renderHeaderFooter');

exports.dropDatabase = function(req, res) {
	if (process.env.NODE_ENV === 'development') {
		mongoose.connection.db.dropDatabase();
		res.jsonp({
			message:'Database Dropped! Please restart your server now!'
		});
	} else {
		res.jsonp({
			error: 'You can only drop the database this way in development mode.',
			message: 'Database not dropped.'
		});
	}
};

exports.viewCtrl = function(req, res) {
	res.render('report/upload', {
		title: 'excel'
	});
};

exports.completed = function(req, res) {
	res.jsonp('Yay');
};

exports.generateLatex = function(req, res, next) {
	headerFooter.renderSections(req, function(err, latex) {
		if (err) return res.jsonp(err);

		req.entireLatex = latex;

		next();
	});
};

exports.generatePDF = function(req, res) {
	var myStream = latex(req.entireLatex);

	var rand = ( Math.floor(Math.random() * 4294967296 ) );
	var name = req.report.reportName + '_r' + rand;
	var path = './public/modules/reports/pdf/' + name + '.pdf';

	var writeable = fs.createWriteStream(path);

	myStream.pipe(writeable);

	myStream.on('error', function(err) {
		return res.jsonp({message: false, err: err});
	});

	writeable.on('finish', function() {
		console.log('Report Generated!');
		return res.jsonp({message: true, path: name});
	});
};

function clean(dir, req, res) {
	var cleanDir = spawn('rm', ['-rf', dir]);

	cleanDir.stderr.on('data', function(data) {
		return res.jsonp({ error: 'error: ' + data });
	});

	cleanDir.on('close', function(code) {
		var createDir = spawn('mkdir', [dir]);

		createDir.stderr.on('data', function(data) {
			return res.jsonp({ error: 'error: ' + data });
		});

		createDir.on('close', function(code) {
			console.log('./' + join(dir, '/placeholder'));

			var place = spawn('touch', ['./' + join(dir, '/placeholder')]);

			place.stderr.on('data', function(data) {
				return res.jsonp({ error: 'error: ' + data });
			});

			place.on('close', function(code) {
				return res.jsonp({ message: 'Cleaned!' });
			});
		});
	});
}

exports.cleanTmp = function(req, res) {
	clean('./app/templates/html2latex_tmp', req, res);
};

exports.cleanExcel = function(req, res) {
	clean('./public/modules/reports/excel', req, res);
};

exports.cleanPDF = function(req, res) {
	clean('./public/modules/reports/pdf', req, res);
};

exports.getLatex = function(req, res) {
	res.jsonp(req.entireLatex);
};

exports.getPDF = function(req, res) {
	res.jsonp(req.entirePDF);
};

exports.getNew = function(req, res) {
	res.jsonp(req.report);
};

exports.createDefault = function(req, res) {
	req.user.reportsCreated++;
	req.user.save();

	var report = new Report({
		reportName: req.body.reportName,
		user: req.user
	});

	report.number = req.user.reportsCreated;
	
	var profile = new Profile({
		report: report,
		user: req.user
	});

	report.profile = profile;

	headerFooter.defaultValues(report, profile, req.user, function(err) {
		if (err) return res.jsonp(err);
		req.report = report;
		res.jsonp(report);
	});
};

exports.createPrevious = function(req, res) {
	req.user.reportsCreated++;
	req.user.save();

	var report = new Report({
		reportName: req.body.reportName,
		user: req.user
	});

	report.number = req.user.reportsCreated;
	
	var profile = new Profile({
		report: report,
		user: req.user
	});

	report.profile = profile;

	headerFooter.previousReport(report, profile, req.user, req.body.prevId, function(err) {
		if (err) return res.jsonp(err);
		req.report = report;
		res.jsonp(report);
	});
};

exports.getReportName = function(req, res) {
	res.jsonp(req.report.reportName);
};

exports.updateReportName = function(req, res) {
	var report = req.report;
	report.reportName = req.body.reportName;
	report.save(function(err) {
		if (err) return err;
		res.jsonp(report);
	});
};

/**
 * Create a Report
 */
exports.create = function(req, res) {
	req.user.reportCreated++;
	req.user.save();

	var report = new Report();
	
	report.user = req.user;
	report.number = req.user.reportsCreated;

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

exports.readReportName = function(req, res) {
	res.jsonp(req.reportName);
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
	.populate('editorServiceReviewer')
	.populate('serviceToSchools')

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

exports.listFromUser = function(req, res) {
	Report.find({user: req.user}, function(err, reports) {
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
	.populate('editorServiceReviewer')
	.populate('serviceToSchools')
	
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
	if (req.report.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};

exports.isAdmin = function(req, res, next) {
	if (process.env.NODE_ENV !== 'development' && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized. Needs Admin Privilages.'
		});
	}

	next();
};
