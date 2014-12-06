'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var governance = require('../../app/controllers/governance/governance');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/governance')
		.get(users.requiresLogin, reports.hasAuthorization, governance.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, governance.create);

	app.route('/governance/:governanceId')
		.get(users.requiresLogin, governance.hasAuthorization, governance.read)
		.put(users.requiresLogin, governance.hasAuthorization, governance.update);

	// Finish by binding the Governances middleware
	app.param('governanceId', governance.governanceById);
};
