'use strict';

angular.module('reports').controller('ProfileController', ['$http', '$scope', '$location', 'Authentication', 'IDs',
	function($http, $scope, $location, Authentication, IDs ) {
		$scope.authentication = Authentication;

		IDs.get().then(function(data) {
			$scope.IDdata = data;

			$scope.firstName = data.name.firstName;
			$scope.middleName = data.name.middleName;
			$scope.lastName = data.name.lastName;

			$scope.tenure = data.tenure.tenure;

			$scope.rank = data.currentRank.rank;
			$scope.department = data.currentRank.department;

			var dy = new Date(data.dateAppointed.date).getFullYear();
			var dm = new Date(data.dateAppointed.date).getMonth() + 1;

			$scope.date = dy + '-' + ( ( dm >= 1 && dm <= 9 ) ? '0' + dm : dm );

			$scope.app = data.affiliateAppointments.app;
		});

		// Update existing Report
		$scope.update = function() {
			$http.put('/profile/' + $scope.IDdata.profile._id, {
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
				alert('Saved!');
			}).
			error(function(data, status, headers, config) {
				alert('There was an error Saving!');
			});
		};
	}
]);