'use strict';

angular.module('reports').controller('Section14Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) 
		{
			$scope.IDdata = data;
			$scope.section14 = data.conferences.info;
		});
		$scope.update = function()
		{
			$http.put('/conferences/' + $scope.IDdata.conferences._id, {

				conferences:{
					info: $scope.section14
				}}).
				success(function(data, status, headers, config) {
					alert('Section14 Saved!');
				}).
				error(function(data, status, headers, config) {
					alert('Error Saving!');
				}
			);
		};
	}
]);
