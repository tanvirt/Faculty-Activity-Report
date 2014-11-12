'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var json = require('../../app/controllers/jsonSchemas');

	app.route('/jsonToSchema')
		.get(users.requiresLogin, json.hasAuthorization, json.read)
		.post(users.requiresLogin, json.hasAuthorization, json.create);

	app.route('/jsonToSchema/:jsonId')
		.get(users.requiresLogin, json.hasAuthorization, json.readById)
		.put(users.requiresLogin, json.hasAuthorization, json.update)
		.delete(users.requiresLogin, json.hasAuthorization, json.delete);

	// Finish by binding the Membership middleware
	app.param('jsonId', json.jsonById);
};