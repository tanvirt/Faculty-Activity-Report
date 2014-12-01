'use strict';

angular.module('reports').controller('Section17Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {

			$scope.IDdata = data;
			$scope.section17 = data.consultationsOutsideUniversity.info;
		});
		$scope.update = function()
		{
			$http.put('/consultationsOutsideUniversity/' + $scope.IDdata.consultationsOutsideUniversity._id, {

				consultationsOutsideUniversity:{
					info: $scope.section17
				}}).
				success(function(data, status, headers, config) {
					alert('Consultations Section Saved!');
				}).
				error(function(data, status, headers, config) {
					alert('Error Saving!');
				}
			);
		};
	}
]);
