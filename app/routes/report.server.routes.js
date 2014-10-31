'use strict';

module.exports = function(app) {
	var report = require('../../app/controllers/report');
	var users = require('../../app/controllers/users');

	app.route('/report/test')
		.get(report.form)
		.post(/*users.requiresLogin,*/report.debug, report.submit_02);

	app.route('/report/generate')
		.get(report.testGenerate)
		.post(report.generate, report.download);

	app.route('/report/download')
		.get(report.testForm)
		.post(report.download);
		
	app.route('/report/oldDebug')
		.get(report.submit_02, report.generate)
		.post(report.download);
};