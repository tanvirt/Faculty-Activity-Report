'use strict';

//Setting up route
angular.module('reports').config(['$stateProvider',
	function($stateProvider) {
		// Reports state routing
		$stateProvider.
		state('teaching-evaluations', {
			url: '/teaching-evaluations',
			templateUrl: 'modules/reports/views/teaching-evaluations.client.view.html'
		}).
		state('assigned-activity', {
			url: '/Activity',
			templateUrl: 'modules/reports/views/assigned-activity.client.view.html'
		}).
		state('listReports', {
			url: '/reports',
			templateUrl: 'modules/reports/views/list-reports.client.view.html'
		}).
		state('createReport', {
			url: '/reports/create',
			templateUrl: 'modules/reports/views/create-report.client.view.html'
		}).
		state('viewReport', {
			url: '/reports/:reportId',
			templateUrl: 'modules/reports/views/view-report.client.view.html'
		}).
		state('editReport', {
			url: '/reports/:reportId/edit',
			templateUrl: 'modules/reports/views/edit-report.client.view.html'
		});
	}
]);