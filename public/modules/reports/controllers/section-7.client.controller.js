'use strict';

angular.module('reports').controller('Section7Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {

			$scope.IDdata = data;
			$scope.section7 = data.teachingAdvising.info;
		});
		$scope.update = function()
		{
			$http.put('/teachingAdvising/' + $scope.IDdata.teachingAdvising._id, {

				teachingAdvising:{
					info: $scope.section7
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
