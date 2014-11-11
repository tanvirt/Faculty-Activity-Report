'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var international = require('../../app/controllers/international/international');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/international')
		.get(users.requiresLogin, international.readFromReport)
		.post(users.requiresLogin, international.create);

	app.route('/reports/:reportId/international/:internationalId')
		.get(international.read)
		.put(users.requiresLogin, international.update);

	// Finish by binding the International middleware
	app.param('internationalId', international.internationalById);
};
