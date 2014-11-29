'use strict';

angular.module('reports').controller('Section20Controller', ['$http', '$scope', '$stateParams', '$location', 'Authentication',
	function($http, $scope, $stateParams, $location, Authentication ) {
		$scope.authentication = Authentication;
		
		$http.get('/reports/' + $stateParams.reportId + '/serviceToSchools').
			success(function(data, status, headers, config) {
				$scope.service = data.info;
				$scope.id = data._id;
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});	

		$scope.update = function() {
			$http.put('/serviceToSchools/' + $scope.id, {
				serviceToSchools: {
					info: $scope.service
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
