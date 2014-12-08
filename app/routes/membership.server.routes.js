'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var membership = require('../../app/controllers/membership/membership');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/membership')
		.get(users.requiresLogin, reports.hasAuthorization, membership.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, membership.create);

	app.route('/membership/:membershipId')
		.get(users.requiresLogin, membership.hasAuthorization, membership.read)
		.put(users.requiresLogin, membership.hasAuthorization, membership.update);

	// Finish by binding the Membership middleware
	app.param('membershipId', membership.membershipById);
};
