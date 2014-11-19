'use strict';

angular.module('reports').controller('Section13Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;
		
		IDs.get().then(function(data) 
		{
			$scope.IDdata = data;
			$scope.section13 = data.publication.info;
		});
		$scope.update = function()
		{
			$http.put('/publication/' + $scope.IDdata.publication._id, {

				publication:{
					info: $scope.section13
				}}).
				success(function(data, status, headers, config) {
					alert('Section13 Saved!');
				}).
				error(function(data, status, headers, config) {
					alert('Error Saving!');
				}
			);
		};
	}
]);
