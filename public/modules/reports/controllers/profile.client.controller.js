'use strict';

angular.module('reports').controller('ProfileController', ['$http', '$scope', '$rootScope', '$stateParams', '$location', 'Authentication', 'IDs',
	function($http, $scope, $rootScope, $stateParams, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		$scope.firstName = 'null';
		$scope.middleName = 'null';
		$scope.lastName = 'null';

		$scope.tenure = 'null';

		$scope.rank = 'null';
		$scope.department = 'null';

		//$scope.date = '2010-10';

		$scope.app = 'null';

		IDs.get().then(function(data) {
			var tmp = new Date(data.dateAppointed.date).toDateString();
			

			$scope.firstName = data.name.firstName;
			$scope.middleName = data.name.middleName;
			$scope.lastName = data.name.lastName;

			$scope.tenure = data.tenure.tenure;

			$scope.rank = data.currentRank.rank;
			$scope.department = data.currentRank.department;

			var dy = new Date(data.dateAppointed.date).getFullYear();
			var dm = new Date(data.dateAppointed.date).getMonth() + 1;

			$scope.date = dy + '-' + 
						  ( ( dm >= 1 && dm <= 9 ) ? '0' + dm : dm );
			console.log($scope.date);

			$scope.app = data.affiliateAppointments.app;
		});

		// Update existing Report
		$scope.update = function() {
			console.log($scope.date);
			IDs.get().then(function(data) {
				$http.put('/profile/' + data.profile._id, {
					name: {
						firstName: $scope.firstName,
						middleName: $scope.middleName,
						lastName: $scope.lastName
					},
					tenure: {
						tenure: $scope.tenure
					}, 
					currentRank: {
						rank: $scope.rank,
						department: $scope.department
					},
					dateAppointed: {
						date: $scope.date
					},
					affiliateAppointments: {
						app: $scope.app
					}
				}).
				success(function(data, status, headers, config) {
					console.log('Saved!');
				}).
				error(function(data, status, headers, config) {
					console.log('There was an error!');
				});
			});
		};
	}
]);