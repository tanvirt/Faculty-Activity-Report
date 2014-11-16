'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var teachingEvaluation = require('../../app/controllers/teachingEvaluation/teachingEvaluation');

	//todo: require authorization
	app.route('/reports/:reportId/teachingEvaluation')
		.get(users.requiresLogin, teachingEvaluation.readFromReport)
		.post(users.requiresLogin, teachingEvaluation.create);

	app.route('/reports/:reportId/teachingEvaluation/:teachingEvaluationId')
		.get(users.requiresLogin, teachingEvaluation.read)
		.put(users.requiresLogin, teachingEvaluation.update);
/*
	app.route('/reports/:reportId/teachingEvaluation/excel')
		.post(users.requiresLogin, teachingEvaluation.createExcel);

	app.route('/reports/:reportId/teachingEvaluation/excel/:teachingEvaluationId')
		.put(users.requiresLogin, teachingEvaluation.updateExcel);
*/

	// Finish by binding the middleware
	app.param('teachingEvaluationId', teachingEvaluation.teachingEvaluationById);
};
