'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var currentRank = require('../../app/controllers/currentRank/currentRank');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/currentRank')
		.get(currentRank.readCurrentRank)
		.post(users.requiresLogin, currentRank.create);

	app.route('/reports/:reportId/currentRank/:currentRankId')
		.get(currentRank.read)
		.put(users.requiresLogin, currentRank.update);

	// Finish by binding the Name middleware
	app.param('currentRankId', currentRank.currentRankById);
};