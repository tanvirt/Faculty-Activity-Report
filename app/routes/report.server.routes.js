'use strict';

module.exports = function(app) {
	var reports = require('../../app/controllers/report');
	
	app.route('/report/test')
		.get(reports.debug, reports.latexString, reports.download);
};