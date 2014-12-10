'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var graduateCommittee = require('../../app/controllers/graduateCommittee/graduateCommittee');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/graduateCommittee')
		.get(users.requiresLogin, reports.hasAuthorization, graduateCommittee.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, graduateCommittee.create);

	app.route('/graduateCommittee/:graduateCommitteeId')
		.get(users.requiresLogin, graduateCommittee.hasAuthorization, graduateCommittee.read)
		.put(users.requiresLogin, graduateCommittee.hasAuthorization, graduateCommittee.update)
		.delete(users.requiresLogin, graduateCommittee.hasAuthorization, graduateCommittee.delete);

	// Finish by binding the graduateCommittee middleware
	app.param('graduateCommitteeId', graduateCommittee.graduateCommitteeById);
};
