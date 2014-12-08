'use strict';

// Reports controller
var app = angular.module('reports');

app.controller('ReportsController', ['$scope', '$rootScope', '$http', '$stateParams', '$location', 'Authentication', 'Reports', 'PDFViewerService', 
	function($scope, $rootScope, $http, $stateParams, $location, Authentication, Reports, pdf ) {
		$scope.authentication = Authentication;

		$scope.viewer = pdf.Instance('viewer');

		$scope.nextPage = function() {
			$scope.viewer.nextPage();
		};

		$scope.prevPage = function() {
			$scope.viewer.prevPage();
		};

		$scope.pageLoaded = function(curPage, totalPages) {
			$scope.currentPage = curPage;
			$scope.totalPages = totalPages;
		};
		
		
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

		$scope.findFromUser = function() {
			$http.get('/reports/reportsFromUser')
			.success(function(data, status, headers, config) {
				$scope.reports = data;
			}).
			error(function(data, status, headers, config) {
				alert('Error Finding your Reports!');
			});
		};

		// Find existing Report
		$scope.findOne = function() {
			$scope.generating = true;

			$scope.report = Reports.get({ 
				reportId: $stateParams.reportId
			});
			
			if ($scope.report) {
				$http.post('/reportdownload/' + $stateParams.reportId).
					success(function(data, status, headers, config) {
						//$location.path('reports/' + $stateParams.reportId);
						$scope.reportPath = data.path;

						if (data.message) {
							$scope.generating = false;
							$scope.pdfLocation = '/modules/reports/pdf/' + data.path + '.pdf';
						}
					}).
					error(function(data, status, headers, config) {
						console.log('error');
					});
			}
		};

		$scope.getName = function() {
			$scope.report = Reports.get({ 
				reportId: $stateParams.reportId
			});
		};

		// Download existing report
		$scope.download = function() {
			if ($scope.reportPath)
				window.open('/modules/reports/pdf/' + $scope.reportPath + '.pdf', '_blank', '');
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
