'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var teachingAdvising = require('../../app/controllers/teachingAdvising/teachingAdvising');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/teachingAdvising')
		.get(users.requiresLogin, teachingAdvising.readFromReport)
		.post(users.requiresLogin, teachingAdvising.create);

	app.route('/reports/:reportId/teachingAdvising/:teachingAdvisingId')
		.get(users.requiresLogin, teachingAdvising.read)
		.put(users.requiresLogin, teachingAdvising.update);

	// Finish by binding the TeachingAdvising middleware
	app.param('teachingAdvisingId', teachingAdvising.teachingAdvisingById);
};
