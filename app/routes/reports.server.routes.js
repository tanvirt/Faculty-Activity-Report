'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var reports = require('../../app/controllers/reports');
	var teachingEvaluation = require('../../app/controllers/teachingEvaluation/teachingEvaluation');

	// Reports Routes
	app.route('/reports')
		.get(users.requiresLogin, reports.list)
		.post(users.requiresLogin, reports.create);

	app.route('/reports/createNew')
		.post(users.requiresLogin, reports.createNew);

	app.route('/reports/:reportId')
		.get(reports.read)
		.put(users.requiresLogin, reports.hasAuthorization, reports.update)
		.delete(users.requiresLogin, reports.hasAuthorization, reports.delete);

		app.route('/reports/:reportId/reportName')
		.get(users.requiresLogin, reports.readReportName)
		.put(users.requiresLogin, reports.update);
		
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

	// Finish by binding the Report middleware
	app.param('reportId', reports.reportByID);
};