'use strict';

angular.module('reports').controller('ProfileController', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication, Reports ) {
		$scope.authentication = Authentication;
		
				// Update existing Report
		$scope.update = function() {
			var report = $scope.report;

			report.$update(function() {
				$location.path('reports/' + report._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.findOne = function() {
			$scope.report = Reports.get({
				reportId: $stateParams.reportId
			});
		};
		
	}
]);

