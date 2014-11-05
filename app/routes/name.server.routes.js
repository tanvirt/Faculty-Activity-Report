'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var name = require('../../app/controllers/name/name');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/name')
		.get(users.requiresLogin, name.readFromReport)
		.post(users.requiresLogin, name.create);

	app.route('/reports/:reportId/name/:nameId')
		.get(name.read)
		.put(users.requiresLogin, name.update);

	// Finish by binding the Name middleware
	app.param('nameId', name.nameById);
};
