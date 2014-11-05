'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var dateAppointed = require('../../app/controllers/dateAppointed/dateAppointed');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/dateAppointed')
		.get(dateAppointed.read)
		.post(users.requiresLogin, dateAppointed.create);

	app.route('/reports/:reportId/dateAppointed/:dateAppointedId')
		.get(dateAppointed.read)
		.put(users.requiresLogin, dateAppointed.update);

	// Finish by binding the Name middleware
	app.param('dateAppointedId', dateAppointed.dateAppointedById);
};