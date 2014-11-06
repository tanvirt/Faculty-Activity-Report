'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var serviceToSchools = require('../../app/controllers/serviceToSchools/serviceToSchools');

	//todo: require authorization
	app.route('/reports/:reportId/serviceToSchools')
		.get(users.requiresLogin, serviceToSchools.readFromReport)
		.post(users.requiresLogin, serviceToSchools.create);

	app.route('/reports/:reportId/serviceToSchools/:serviceToSchoolsId')
		.get(serviceToSchools.read)
		.put(users.requiresLogin, serviceToSchools.update);

	// Finish by binding the Name middleware
	app.param('serviceToSchoolsId', serviceToSchools.serviceToSchoolsById);
};
