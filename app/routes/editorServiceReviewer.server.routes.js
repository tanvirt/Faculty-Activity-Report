'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var editorServiceReviewer = require('../../app/controllers/editorServiceReviewer/editorServiceReviewer');
	//var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/editorServiceReviewer')
		.get(users.requiresLogin, editorServiceReviewer.readFromReport)
		.post(users.requiresLogin, editorServiceReviewer.create);

	app.route('/reports/:reportId/editorServiceReviewer/:editorServiceReviewerId')
		.get(users.requiresLogin, editorServiceReviewer.read)
		.put(users.requiresLogin, editorServiceReviewer.update);

	// Finish by binding the editorServiceReviewer middleware
	app.param('editorServiceReviewerId', editorServiceReviewer.editorServiceReviewerById);
};