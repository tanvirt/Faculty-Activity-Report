'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var reports = require('../../app/controllers/reports');

	// Reports Routes
	app.route('/reports')
		.get(users.requiresLogin, reports.list)
		.post(users.requiresLogin, reports.create);

	app.route('/reports/createBlank')
		.post(users.requiresLogin, reports.createBlank);	

	app.route('/reports/:reportId')
		.get(reports.read)
		.put(users.requiresLogin, reports.hasAuthorization, reports.update)
		.delete(users.requiresLogin, reports.hasAuthorization, reports.delete);

	app.route('/reportdownload/:reportId')
		.get(users.requiresLogin, reports.hasAuthorization, 
			 reports.generateLatex, reports.generatePDF, reports.download);

	app.route('/reportdownload/:reportId/latex')
		.get(users.requiresLogin, reports.hasAuthorization, 
			reports.generateLatex, reports.getLatex);

	// Finish by binding the Report middleware
	app.param('reportId', reports.reportByID);
};