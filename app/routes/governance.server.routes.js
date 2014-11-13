'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var governance = require('../../app/controllers/governance/governance');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/governance')
		.get(users.requiresLogin, governance.readFromReport)
		.post(users.requiresLogin, governance.create);

	app.route('/reports/:reportId/governance/:governanceId')
		.get(users.requiresLogin, governance.read)
		.put(users.requiresLogin, governance.update);

	// Finish by binding the governance middleware
	app.param('governanceId', governance.governanceById);
};