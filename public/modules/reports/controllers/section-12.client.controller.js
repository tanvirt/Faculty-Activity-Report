'use strict';

angular.module('reports').controller('Section12Controller', ['$scope', '$stateParams', '$location', 'Authentication', 'Patents',
	function($scope, $stateParams, $location, Authentication, Reports, Patents) {
		
		$scope.createPatents = function() {
			// Create new Patent object
			var patent = new Patents ({
				title: this.title,
				description: this.description,
				patentNumber: this.patentNumber,
				authors: this.authors,
				date: this.date
			});
			patent.$save(function(response) {
				$scope.title = '';
				$scope.description = '';
				$scope.patentNumber = '';
				$scope.authors = '';
				$scope.date = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);