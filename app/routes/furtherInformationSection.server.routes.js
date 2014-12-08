'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var furtherInformationSection = require('../../app/controllers/furtherInformationSection/furtherInformationSection');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/furtherInformationSection')
		.get(users.requiresLogin, reports.hasAuthorization, furtherInformationSection.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, furtherInformationSection.create);

	app.route('/furtherInformationSection/:furtherInformationSectionId')
		.get(users.requiresLogin, furtherInformationSection.hasAuthorization, furtherInformationSection.read)
		.put(users.requiresLogin, furtherInformationSection.hasAuthorization, furtherInformationSection.update);

	// Finish by binding the FurtherInformationSection middleware
	app.param('furtherInformationSectionId', furtherInformationSection.furtherInformationSectionById);
};
