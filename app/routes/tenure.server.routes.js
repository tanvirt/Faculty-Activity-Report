'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var tenure = require('../../app/controllers/tenure/tenure');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/tenure')
		.get(users.requiresLogin, tenure.readFromReport)
		.post(users.requiresLogin, tenure.create);

	app.route('/reports/:reportId/tenure/:tenureId')
		.get(tenure.read)
		.put(users.requiresLogin, tenure.update);

	// Finish by binding the Name middleware
	app.param('tenureId', tenure.tenureById);
};