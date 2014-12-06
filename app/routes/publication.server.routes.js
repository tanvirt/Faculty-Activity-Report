'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var publication = require('../../app/controllers/publication/publication');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/publication')
		.get(users.requiresLogin, reports.hasAuthorization, publication.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, publication.create);

	app.route('/publication/:publicationId')
		.get(users.requiresLogin, publication.hasAuthorization, publication.read)
		.put(users.requiresLogin, publication.hasAuthorization, publication.update);

	// Finish by binding the Publication middleware
	app.param('publicationId', publication.publicationById);
};
