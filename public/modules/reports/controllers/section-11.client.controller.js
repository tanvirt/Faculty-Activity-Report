'use strict';

angular.module('reports').controller('Section11Controller', ['$scope', '$stateParams', '$location', 'Authentication', 'CreativeWorks',
	function($scope, $stateParams, $location, Authentication, Reports, CreativeWorks) {

		$scope.createCreativeWorks = function() {
			// Create new CreativeWork object
			var creativeWork = new CreativeWorks ({
				name: this.name,
				description: this.description,
				website: this.website,
				jointEfforts: this.jointEfforts,
				date: this.date
			});
			creativeWork.$save(function(response) {
				$scope.name = '';
				$scope.description = '';
				$scope.website = '';
				$scope.jointEfforts = '';
				$scope.date = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);