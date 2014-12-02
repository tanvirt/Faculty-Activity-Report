'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var teachingAdvising = require('../../app/controllers/teachingAdvising/teachingAdvising');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/teachingAdvising')
		.get(users.requiresLogin, reports.hasAuthorization, teachingAdvising.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, teachingAdvising.create);

	app.route('/teachingAdvising/:teachingAdvisingId')
		.get(users.requiresLogin, teachingAdvising.hasAuthorization, teachingAdvising.read)
		.put(users.requiresLogin, teachingAdvising.hasAuthorization, teachingAdvising.update);

	// Finish by binding the TeachingAdvising middleware
	app.param('teachingAdvisingId', teachingAdvising.teachingAdvisingById);
};
