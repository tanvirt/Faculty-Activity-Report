'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var patents = require('../../app/controllers/patents/patents');
	var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/patents')
		.get(users.requiresLogin, patents.readFromReport)
		.post(users.requiresLogin, patents.create);

	app.route('/patents/:patentsId')
		.get(users.requiresLogin, patents.read)
		.put(users.requiresLogin, patents.update);

	// Finish by binding the patents middleware
	app.param('patentsId', patents.patentsById);
};
