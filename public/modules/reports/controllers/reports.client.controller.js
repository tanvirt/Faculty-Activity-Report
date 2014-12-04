'use strict';

// Reports controller
var app = angular.module('reports');

app.controller('ReportsController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Authentication', 'Reports',
	function($scope, $rootScope, $http, $stateParams, $location, Authentication, Reports ) {
		$scope.authentication = Authentication;
		
		
		// Create new Report
		$scope.createDefault = function() {
			$http.post('/reports/createDefault', {
				reportName: $scope.reportName
			}).
			success(function(data, status, headers, config) {
				$location.path('reports/' + data._id + '/edit');
			}).
			error(function(data, status, headers, config) {
				console.log('Error in Reports');
			});
		};

		$scope.createPrevious = function() {
			if ($scope.id) {
				$http.post('/reports/createPrevious', {
					reportName: $scope.reportName,
					prevId: $scope.id
				}).
				success(function(data, status, headers, config) {
					$location.path('reports/' + data._id + '/edit');
				}).
				error(function(data, status, headers, config) {
					console.log('Error in Reports');
				});
			}
		};

		// Remove existing Report
		$scope.remove = function( report ) {
			if ( report ) { 
				report.$remove();

				for (var i in $scope.reports ) {
					if ($scope.reports [i] === report ) {
						$scope.reports.splice(i, 1);
					}
				}
			} else {
				$scope.report.$remove(function() {
					$location.path('reports');
				});
			}
		};

		// Update existing Report
		$scope.update = function() {
			var report = $scope.report;

			report.$update(function() {
				$location.path('reports/' + report._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Reports
		$scope.find = function() {
			$scope.reports = Reports.query();
		};

		// Find existing Report
		$scope.findOne = function() {
			$scope.report = Reports.get({ 
				reportId: $stateParams.reportId
			});
		};

		// Download existing report
		$scope.download = function() {
			if ($scope.report) {
				$http.get('/reportdownload/' + $scope.report._id).
					success(function(data, status, headers, config) {
						window.open('/modules/reports/pdf/' + $scope.report._id + '.pdf', '_blank', '');
					}).
					error(function(data, status, headers, config) {
						console.log('error');
					});
			}
		};

		$scope.updateName = function() {
			var report = $scope.report;

			$http.put('/reports/' + report._id + '/reportName', {
				reportName: $scope.reportName
			}).
			success(function(data, status, headers, config) {
				alert('name updated');
			}).
			error(function(data, status, headers, config) {
				console.log('error');
			});
		};
	}
]);
