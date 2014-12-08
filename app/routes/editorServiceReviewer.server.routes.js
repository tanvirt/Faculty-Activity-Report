'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var editorServiceReviewer = require('../../app/controllers/editorServiceReviewer/editorServiceReviewer');
	var reports = require('../../app/controllers/reports');

	app.route('/reports/:reportId/editorServiceReviewer')
		.get(users.requiresLogin, reports.hasAuthorization, editorServiceReviewer.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, editorServiceReviewer.create);

	app.route('/editorServiceReviewer/:editorServiceReviewerId')
		.get(users.requiresLogin, editorServiceReviewer.hasAuthorization, editorServiceReviewer.read)
		.put(users.requiresLogin, editorServiceReviewer.hasAuthorization, editorServiceReviewer.update);

	// Finish by binding the EditorServiceReviewer middleware
	app.param('editorServiceReviewerId', editorServiceReviewer.editorServiceReviewerById);
};
