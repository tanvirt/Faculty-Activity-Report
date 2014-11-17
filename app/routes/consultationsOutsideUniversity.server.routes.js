'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var consultationsOutsideUniversity = require('../../app/controllers/consultationsOutsideUniversity/consultationsOutsideUniversity');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/consultationsOutsideUniversity')
		.get(users.requiresLogin, consultationsOutsideUniversity.readFromReport)
		.post(users.requiresLogin, consultationsOutsideUniversity.create);

	app.route('/consultationsOutsideUniversity/:consultationsOutsideUniversityId')
		.get(users.requiresLogin, consultationsOutsideUniversity.read)
		.put(users.requiresLogin, consultationsOutsideUniversity.update);

	// Finish by binding the ConsultationsOutsideUniversity middleware
	app.param('consultationsOutsideUniversityId', consultationsOutsideUniversity.consultationsOutsideUniversityById);
};
