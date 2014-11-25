'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var contracts = require('../../app/controllers/contracts/contracts');
	var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/contracts')
		.get(users.requiresLogin, reports.hasAuthorization, contracts.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, contracts.create);

	app.route('/contracts/:contractsId')
		.get(users.requiresLogin, contracts.hasAuthorization, contracts.read)
		.put(users.requiresLogin, contracts.hasAuthorization, contracts.update)
		.delete(users.requiresLogin, contracts.hasAuthorization, contracts.delete);

	// Finish by binding the contracts middleware
	app.param('contractsId', contracts.contractsById);
};
