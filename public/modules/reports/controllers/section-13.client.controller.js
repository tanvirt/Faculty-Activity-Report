'use strict';

angular.module('reports').controller('Section13Controller', ['$http', '$scope', '$location', 'Authentication', 'IDs', 'x2js',
	function($http, $scope, $location, Authentication, IDs, x2js ) {
		$scope.authentication = Authentication;
		console.log($scope.frame);
		$scope.search = function(){
//   http://dblp.uni-trier.de/rec/pers/d/Dobra:Alin/xk
			$http.get('http://www.html5rocks.com/en/tutorials/file/xhr2/',{
				}).
				success(function(data, status, headers, config) {
				console.log(data);
			}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});

		};
		
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
