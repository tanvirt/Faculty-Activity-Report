'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var honors = require('../../app/controllers/honors/honors');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/honors')
		.get(users.requiresLogin, honors.readFromReport)
		.post(users.requiresLogin, honors.create);

	app.route('/honors/:honorsId')
		.get(users.requiresLogin, honors.read)
		.put(users.requiresLogin, honors.update);

	// Finish by binding the Honors middleware
	app.param('honorsId', honors.honorsById);
};
