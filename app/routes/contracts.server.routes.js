'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var contracts = require('../../app/controllers/contracts/contracts');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/contracts')
		.get(users.requiresLogin, contracts.readFromReport)
		.post(users.requiresLogin, contracts.create);

	app.route('/reports/:reportId/contracts/:contractsId')
		.get(users.requiresLogin, contracts.read)
		.put(users.requiresLogin, contracts.update);

	// Finish by binding the contracts middleware
	app.param('contractsId', contracts.contractsById);
};
