'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var teachingEvaluation = require('../../app/controllers/teachingEvaluation/teachingEvaluation');

	//todo: require authorization
	app.route('/reports/:reportId/teachingEvaluation')
		.get(users.requiresLogin, teachingEvaluation.readFromReport)
		.post(users.requiresLogin, teachingEvaluation.create);

	app.route('/reports/:reportId/teachingEvaluation/:teachingEvaluationId')
		.get(teachingEvaluation.read)
		.put(users.requiresLogin, teachingEvaluation.update);

	// Finish by binding the middleware
	app.param('teachingEvaluationId', teachingEvaluation.teachingEvaluationById);
};
