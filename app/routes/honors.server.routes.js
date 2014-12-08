'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var honors = require('../../app/controllers/honors/honors');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/honors')
		.get(users.requiresLogin, reports.hasAuthorization, honors.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, honors.create);

	app.route('/honors/:honorsId')
		.get(users.requiresLogin, honors.hasAuthorization, honors.read)
		.put(users.requiresLogin, honors.hasAuthorization, honors.update);

	// Finish by binding the Honors middleware
	app.param('honorsId', honors.honorsById);
};
