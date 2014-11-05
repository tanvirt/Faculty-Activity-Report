'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var assignedActivity = require('../../app/controllers/assignedActivity/assignedActivity');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/assignedActivity')
		.get(users.requiresLogin, assignedActivity.readFromReport)
		.post(users.requiresLogin, assignedActivity.create);

	app.route('/reports/:reportId/assignedActivity/:assignedActivityId')
		.get(assignedActivity.read)
		.put(users.requiresLogin, assignedActivity.update);

	// Finish by binding the AssignedActivity middleware
	app.param('assignedActivityId', assignedActivity.assignedActivityById);
};
