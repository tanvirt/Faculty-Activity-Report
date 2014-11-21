'use strict';

angular.module('reports').controller('Section18Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {

			$scope.IDdata = data;
			$scope.section18 = data.editorServiceReviewer.info;
		});
		$scope.update = function()
		{
			$http.put('/editorServiceReviewer/' + $scope.IDdata.editorServiceReviewer._id, {

				editorServiceReviewer:{
					info: $scope.section18
				}}).
				success(function(data, status, headers, config) {
					alert('editorServiceReviewer Section Saved!');
				}).
				error(function(data, status, headers, config) {
					alert('Error Saving!');
				}
			);
		};
	}
]);
