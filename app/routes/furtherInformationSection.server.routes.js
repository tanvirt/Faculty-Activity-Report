'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var furtherInformationSection = require('../../app/controllers/furtherInformationSection/furtherInformationSection');

	//todo: require authorization
	app.route('/reports/:reportId/furtherInformationSection')
		.get(users.requiresLogin, furtherInformationSection.readFromReport)
		.post(users.requiresLogin, furtherInformationSection.create);

	app.route('/furtherInformationSection/:furtherInformationSectionId')
		.get(users.requiresLogin, furtherInformationSection.read)
		.put(users.requiresLogin, furtherInformationSection.update);

	// Finish by binding the FurtherInformationSection middleware
	app.param('furtherInformationSectionId', furtherInformationSection.furtherInformationSectionById);
};
