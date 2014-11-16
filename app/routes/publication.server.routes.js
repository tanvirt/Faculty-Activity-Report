'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var publication = require('../../app/controllers/publication/publication');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/publication')
		.get(users.requiresLogin, publication.readFromReport)
		.post(users.requiresLogin, publication.create);

	app.route('/publication/:publicationId')
		.get(users.requiresLogin, publication.read)
		.put(users.requiresLogin, publication.update);

	// Finish by binding the International middleware
	app.param('publicationId', publication.publicationById);
};
