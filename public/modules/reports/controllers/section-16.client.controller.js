'use strict';

angular.module('reports').controller('Section16Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {

			$scope.IDdata = data;
			$scope.section16 = data.governance.govStr;
		});
		$scope.update = function()
		{
			$http.put('/governance/' + $scope.IDdata.governance._id, {

				governance:{
					govStr: $scope.section16
				}}).
				success(function(data, status, headers, config) {
					alert('Section Saved!');
				}).
				error(function(data, status, headers, config) {
					alert('Error Saving!');
				}
			);
		};
	}
]);
