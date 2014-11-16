'use strict';

angular.module('reports').controller('ProfileController', ['$http', '$scope', '$rootScope', '$stateParams', '$location', 'Authentication',
	function($http, $scope, $rootScope, $stateParams, $location, Authentication ) {
		$scope.authentication = Authentication;

		$scope.data = {};
		
		// Update existing Report
		$scope.update = function() {
			$http.put('/profile/' + $rootScope.report.profile, $scope.data).
				success(function(data, status, headers, config) {
					console.log('Saved!');
				}).
				error(function(data, status, headers, config) {
					console.log('There was an error!');
				});

		};
	}
]);