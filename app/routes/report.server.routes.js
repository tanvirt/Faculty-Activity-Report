'use strict';

module.exports = function(app) {
	var reports = require('../../app/controllers/report');
	var users = require('../../app/controllers/users');

	app.route('/report/test')
		.get(reports.form)
		.post(users.requiresLogin, reports.submit);

	app.route('/report')
		.get(reports.testForm, reports.generate)
		.post(reports.download);
		
	app.route('/report/dummyDebug')
		.get(reports.debug, reports.generate)
		.post(reports.download);
};