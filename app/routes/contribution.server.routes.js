'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var contribution = require('../../app/controllers/contribution/contribution');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/contribution')
		.get(users.requiresLogin, contribution.readFromReport)
		.post(users.requiresLogin, contribution.create);

	app.route('/contribution/:contributionId')
		.get(users.requiresLogin, contribution.read)
		.put(users.requiresLogin, contribution.update);

	// Finish by binding the Contribution middleware
	app.param('contributionId', contribution.contributionById);
};
