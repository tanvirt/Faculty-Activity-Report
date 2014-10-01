'use strict';

module.exports = function(app) {
	var reports = require('../../app/controllers/report');

	app.route('/report/test').get(reports.latexString); // test report generation
};