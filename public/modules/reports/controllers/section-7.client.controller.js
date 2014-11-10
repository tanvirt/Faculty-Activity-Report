'use strict';

angular.module('reports').controller('Section7Controller', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication, Reports ) {
		$scope.authentication = Authentication;
		
	}
]);