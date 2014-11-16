'use strict';

angular.module('reports').controller('ProfileController', ['$http', '$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $http, $stateParams, $location, Authentication ) {
		$scope.authentication = Authentication;
		
				// Update existing Report
		$scope.update = function() {
			console.log('Here');
			console.log($scope.report.profile);
			//$http.put('/profile/' + $scope.report.profile._id).
		};

		$scope.findOne = function() {
			
		};
	}
]);