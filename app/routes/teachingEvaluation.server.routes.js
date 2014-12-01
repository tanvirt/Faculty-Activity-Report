'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var teachingEvaluation = require('../../app/controllers/teachingEvaluation/teachingEvaluation');
	var reports = require('../../app/controllers/reports');

	//todo: require authorization
	app.route('/reports/:reportId/teachingEvaluation')
		.get(users.requiresLogin, reports.hasAuthorization, teachingEvaluation.readFromReport)
		.post(users.requiresLogin, reports.hasAuthorization, teachingEvaluation.create);

	app.route('/teachingEvaluation/:teachingEvaluationId')
		.get(users.requiresLogin, teachingEvaluation.hasAuthorization, teachingEvaluation.read)
		.put(users.requiresLogin, teachingEvaluation.hasAuthorization, teachingEvaluation.update)
		.delete(users.requiresLogin, teachingEvaluation.hasAuthorization, teachingEvaluation.delete);

	app.route('/reports/:reportId/teachingEvaluation/excel')
		//.get(users.requiresLogin, teachingEvaluation.hasAuthorization, teachingEvaluation.getAllExcels)
		.get(reports.viewCtrl)
		.post(users.requiresLogin, teachingEvaluation.getExcel);

	/*app.route('/teachingEvaluation/excel/:teachingEvaluationId')
		.get(users.requiresLogin, teachingEvaluation.hasAuthorization, teachingEvaluation.getExcel)
		.put(users.requiresLogin, teachingEvaluation.hasAuthorization, teachingEvaluation.updateExcel);*/

	// Finish by binding the middleware
	app.param('teachingEvaluationId', teachingEvaluation.teachingEvaluationById);
};
