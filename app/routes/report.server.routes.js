'use strict';

module.exports = function(app) {
	var reports = require('../../app/controllers/report');
	var users = require('../../app/controllers/users');

	app.route('/report/test')
		.get(reports.form)
		.post(/*users.requiresLogin,*/reports.debug, reports.submit_02);

	app.route('/report/generate')
		.get(reports.testGenerate)
		.post(reports.generate, reports.download);

	app.route('/report/download')
		.get(reports.testForm)
		.post(reports.download);
		
	app.route('/report/oldDebug')
		.get(reports.submit_02, reports.generate)
		.post(reports.download);
};