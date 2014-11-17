'use strict';

angular.module('reports').controller('Section10Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {

			$scope.IDdata = data;
			$scope.section10 = data.contribution.info;
		});
		$scope.update = function()
		{
			$http.put('/contribution/' + $scope.IDdata.contribution._id, {

				contribution:{
					info: $scope.section10
				}}).
				success(function(data, status, headers, config) {
					alert('Saved!');
				}).
				error(function(data, status, headers, config) {
					alert('There was an error Saving!');
				}
			);
		};
	}
]);

