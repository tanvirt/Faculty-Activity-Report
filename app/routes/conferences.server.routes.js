'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var conferences = require('../../app/controllers/conferences/conferences');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/conferences')
		.get(users.requiresLogin, conferences.readFromReport)
		.post(users.requiresLogin, conferences.create);

	app.route('/reports/:reportId/conferences/:conferencesId')
		.get(users.requiresLogin, conferences.read)
		.put(users.requiresLogin, conferences.update);

	// Finish by binding the conferences middleware
	app.param('conferencesId', conferences.conferencesById);
};