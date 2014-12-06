'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var contribution = require('../../app/controllers/contribution/contribution');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/contribution')
		.get(users.requiresLogin, reports.hasAuthorization, contribution.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, contribution.create);

	app.route('/contribution/:contributionId')
		.get(users.requiresLogin, contribution.hasAuthorization, contribution.read)
		.put(users.requiresLogin, contribution.hasAuthorization, contribution.update);

	// Finish by binding the Contribution middleware
	app.param('contributionId', contribution.contributionById);
};
