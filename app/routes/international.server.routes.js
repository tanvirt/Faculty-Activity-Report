'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var international = require('../../app/controllers/international/international');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/international')
		.get(users.requiresLogin, reports.hasAuthorization, international.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, international.create);

	app.route('/international/:internationalId')
		.get(users.requiresLogin, international.hasAuthorization, international.read)
		.put(users.requiresLogin, international.hasAuthorization, international.update);

	// Finish by binding the TeachingAdvising middleware
	app.param('internationalId', international.internationalById);
};
