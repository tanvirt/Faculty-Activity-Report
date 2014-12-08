'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var serviceToSchools = require('../../app/controllers/serviceToSchools/serviceToSchools');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/serviceToSchools')
		.get(users.requiresLogin, reports.hasAuthorization, serviceToSchools.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, serviceToSchools.create);

	app.route('/serviceToSchools/:serviceToSchoolsId')
		.get(users.requiresLogin, serviceToSchools.hasAuthorization, serviceToSchools.read)
		.put(users.requiresLogin, serviceToSchools.hasAuthorization, serviceToSchools.update);

	// Finish by binding the ServiceToSchools middleware
	app.param('serviceToSchoolsId', serviceToSchools.serviceToSchoolsById);
};
