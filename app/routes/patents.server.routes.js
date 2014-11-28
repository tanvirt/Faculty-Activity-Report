'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var patents = require('../../app/controllers/patents/patents');
	var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/patents')
		.get(users.requiresLogin, reports.hasAuthorization, patents.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, patents.create);

	app.route('/patents/:patentsId')
		.get(users.requiresLogin, patents.hasAuthorization, patents.read)
		.put(users.requiresLogin, patents.hasAuthorization, patents.update)
		.delete(users.requiresLogin, patents.hasAuthorization, patents.delete);

	// Finish by binding the patents middleware
	app.param('patentsId', patents.patentsById);
};
