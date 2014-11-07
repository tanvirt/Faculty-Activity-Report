'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var affiliateAppointments = require('../../app/controllers/affiliateAppointments/affiliateAppointments');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/affiliateAppointments')
		.get(affiliateAppointments.readFromReport)
		.post(users.requiresLogin, affiliateAppointments.create);

	app.route('/reports/:reportId/affiliateAppointments/:affiliateAppointmentsId')
		.get(affiliateAppointments.read)
		.put(users.requiresLogin, affiliateAppointments.update);

	// Finish by binding the Name middleware
	app.param('affiliateAppointmentsId', affiliateAppointments.affiliateAppointmentsById);
};