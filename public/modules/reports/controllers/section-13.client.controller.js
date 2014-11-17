'use strict';

angular.module('reports').controller('Section13Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {

			$scope.IDdata = data;
			$scope.section13 = data.publications.info;
		});
		$scope.update = function()
		{
			$http.put('/publications/' + $scope.IDdata.publications._id, {

				publications:{
					info: $scope.section13
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
