'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var reports = require('../../app/controllers/reports');
	var teachingEvaluation = require('../../app/controllers/teachingEvaluation/teachingEvaluation');

	// Reports Routes
	app.route('/reports')
		.get(users.requiresLogin, reports.list)
		.post(users.requiresLogin, reports.create);

	app.route('/reports/createDefault')
		.post(users.requiresLogin, reports.createDefault);

	app.route('/reports/createPrevious')
		.post(users.requiresLogin, reports.createPrevious);

	app.route('/reports/:reportId')
		.get(reports.read)
		.put(users.requiresLogin, reports.hasAuthorization, reports.update)
		.delete(users.requiresLogin, reports.hasAuthorization, reports.delete);

	app.route('/reports/:reportId/reportName')
		.get(reports.getReportName)
		.put(users.requiresLogin, reports.hasAuthorization, reports.updateReportName);

	app.route('/reportdownload/:reportId')
		.get(users.requiresLogin, reports.hasAuthorization, 
			 reports.generateLatex, reports.generatePDF, reports.viewPDF);
		
	app.route('/reportdownload/:reportId/latex')
		.get(users.requiresLogin, reports.hasAuthorization, 
			reports.generateLatex, reports.getLatex);

	app.route('/upload')
		.get(reports.viewCtrl)
		.post(teachingEvaluation.getExcel, teachingEvaluation.saveExcel);

	app.route('/reportdownload/:reportId/download')
		.get(users.requiresLogin, reports.hasAuthorization, reports.download);

	app.route('/cleanTmp')
		.get(users.requiresLogin, reports.isAdmin, reports.cleanTmp);

	app.route('/cleanExcel')
		.get(users.requiresLogin, reports.isAdmin, reports.cleanExcel);

	app.route('/cleanPDF')
		.get(users.requiresLogin, reports.isAdmin, reports.cleanPDF);

	app.route('/dropDatabase')
		.get(reports.dropDatabase);

	// Finish by binding the Report middleware
	app.param('reportId', reports.reportByID);
};