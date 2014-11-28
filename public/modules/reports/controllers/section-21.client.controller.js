'use strict';

angular.module('reports').controller('Section21Controller', ['$http', '$scope', '$stateParams', '$location', 'Authentication',
	function($http, $scope, $stateParams, $location, Authentication ) {
		$scope.authentication = Authentication;
		
		$http.get('/reports/' + $stateParams.reportId + '/membership').
			success(function(data, status, headers, config) {
				$scope.info = data.info;
				$scope.id = data._id;
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});	

		$scope.update = function() {
			$http.put('/membership/' + $scope.id, {
				membership: {
					info: $scope.info
				}
			}).
			success(function(data, status, headers, config) {
				alert('updated');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in updating the report');
			});
		};
	}
]);
