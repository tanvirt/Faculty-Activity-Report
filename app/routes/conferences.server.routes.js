'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var conferences = require('../../app/controllers/conferences/conferences');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/conferences')
		.get(users.requiresLogin, reports.hasAuthorization, conferences.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, conferences.create);

	app.route('/conferences/:conferencesId')
		.get(users.requiresLogin, conferences.hasAuthorization, conferences.read)
		.put(users.requiresLogin, conferences.hasAuthorization, conferences.update);

	// Finish by binding the Conferences middleware
	app.param('conferencesId', conferences.conferencesById);
};
