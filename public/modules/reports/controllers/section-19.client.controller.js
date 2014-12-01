'use strict';

angular.module('reports').controller('Section19Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {

			$scope.IDdata = data;
			$scope.section19 = data.international.info;
		});
		$scope.update = function()
		{
			$http.put('/international/' + $scope.IDdata.international._id, {

				international:{
					info: $scope.section19
				}}).
				success(function(data, status, headers, config) {
					alert('International Section Saved!');
				}).
				error(function(data, status, headers, config) {
					alert('Error Saving!');
				}
			);
		};
	}
]);
