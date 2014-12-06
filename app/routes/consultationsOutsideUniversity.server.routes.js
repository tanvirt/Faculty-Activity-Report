'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var consultationsOutsideUniversity = require('../../app/controllers/consultationsOutsideUniversity/consultationsOutsideUniversity');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/consultationsOutsideUniversity')
		.get(users.requiresLogin, reports.hasAuthorization, consultationsOutsideUniversity.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, consultationsOutsideUniversity.create);

	app.route('/consultationsOutsideUniversity/:consultationsOutsideUniversityId')
		.get(users.requiresLogin, consultationsOutsideUniversity.hasAuthorization, consultationsOutsideUniversity.read)
		.put(users.requiresLogin, consultationsOutsideUniversity.hasAuthorization, consultationsOutsideUniversity.update);

	// Finish by binding the ConsultationsOutsideUniversity middleware
	app.param('consultationsOutsideUniversityId', consultationsOutsideUniversity.consultationsOutsideUniversityById);
};
