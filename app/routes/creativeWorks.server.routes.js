'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var creativeWorks = require('../../app/controllers/creativeWorks/creativeWorks');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/creativeWorks')
		.get(users.requiresLogin, creativeWorks.readFromReport)
		.post(users.requiresLogin, creativeWorks.create);

	app.route('/reports/:reportId/creativeWorks/:creativeWorksId')
		.get(creativeWorks.read)
		.put(users.requiresLogin, creativeWorks.update);

	// Finish by binding the creativeWorks middleware
	app.param('creativeWorksId', creativeWorks.creativeWorksById);
};
