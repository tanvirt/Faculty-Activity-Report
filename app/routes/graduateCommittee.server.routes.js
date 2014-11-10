'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var graduateCommittee = require('../../app/controllers/graduateCommittee/graduateCommittee');

	//todo: require authorization
	app.route('/reports/:reportId/graduateCommittee')
		.get(users.requiresLogin, graduateCommittee.readFromReport)
		.post(users.requiresLogin, graduateCommittee.create);

	app.route('/reports/:reportId/graduateCommittee/:graduateCommitteeId')
		.get(graduateCommittee.read)
		.put(users.requiresLogin, graduateCommittee.update);

	// Finish by binding the middleware
	app.param('graduateCommitteeId', graduateCommittee.graduateCommitteenById);
};
