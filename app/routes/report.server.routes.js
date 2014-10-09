'use strict';

module.exports = function(app) {
	var reports = require('../../app/controllers/report');
	var users = require('../../app/controllers/users');

	app.route('/report/test')
		.get(reports.form)
		.post(users.requiresLogin, reports.submit);

	app.route('/report/test/generate')
		.get(reports.generate);

	app.route('/report/test/download')
		.get(reports.download);
};