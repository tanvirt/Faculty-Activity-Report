'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var assignedActivity = require('../../app/controllers/assignedActivity/assignedActivity');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/assignedActivity')
		.get(users.requiresLogin, reports.hasAuthorization, assignedActivity.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, assignedActivity.create);

	app.route('/assignedActivity/:assignedActivityId')
		.get(users.requiresLogin, assignedActivity.hasAuthorization, assignedActivity.read)
		.put(users.requiresLogin, assignedActivity.hasAuthorization, assignedActivity.update);

	// Finish by binding the AssignedActivity middleware
	app.param('assignedActivityId', assignedActivity.assignedActivityById);
};
