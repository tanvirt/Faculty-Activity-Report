'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var serviceToSchool = require('../../app/controllers/serviceToSchool/serviceToSchool');

	//todo: require authorization
	app.route('/reports/:reportId/serviceToSchool')
		.get(serviceToSchool.readFromReport)
		.post(users.requiresLogin, serviceToSchool.create);

	app.route('/reports/:reportId/serviceToSchool/:serviceToSchoolId')
		.get(serviceToSchool.read)
		.put(users.requiresLogin, serviceToSchool.update);

	// Finish by binding the Name middleware
	app.param('serviceToSchoolId', serviceToSchool.serviceToSchoolById);
};