'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var profile = require('../../app/controllers/profile/profile');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/profile')
		.get(users.requiresLogin, profile.read)
		.post(users.requiresLogin, profile.create);

	app.route('/reports/:reportId/profile/:profileId')
		.put(users.requiresLogin, profile.update);

	// Finish by binding the Name middleware
	app.param('profileId', profile.profileById);
};
