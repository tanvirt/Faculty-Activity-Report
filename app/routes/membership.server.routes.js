'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var membership = require('../../app/controllers/membership/membership');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/membership')
		.get(users.requiresLogin, membership.readFromReport)
		.post(users.requiresLogin, membership.create);

	app.route('/reports/:reportId/membership/:membershipId')
		.get(users.requiresLogin, membership.read)
		.put(users.requiresLogin, membership.update);

	// Finish by binding the Membership middleware
	app.param('membershipId', membership.membershipById);
};
