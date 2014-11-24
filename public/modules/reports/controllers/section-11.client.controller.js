'use strict';

angular.module('reports').controller('Section11Controller', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'IDs',
	function($scope, $http, $stateParams, $location, Authentication, IDs) {
		$scope.authentication = Authentication;

		console.log($stateParams.reportId);

		$http.get('/reports/' + $stateParams.reportId + '/creativeWorks').
			success(function(data, status, headers, config) {
				console.log(data);
				var obj = [];

				for (var i=0; i<data.length; i++) {
					obj[i] = {};
					
					obj[i].name = data[i].name;
					obj[i].description = data[i].description;
					obj[i].website = data[i].website;
					
					if ( data[i].jointEfforts.length !== 0 ) {
						obj[i].jointEfforts = data[i].jointEfforts[0];
					} else {
						obj[i].jointEfforts = '';
					}

					for (var j=1; j<data[i].jointEfforts.length; j++) {
						obj[i].jointEfforts = obj[i].jointEfforts + ', ' + data[i].jointEfforts[j];
					}

					var dy = new Date(data[i].date).getFullYear();
					var dm = new Date(data[i].date).getMonth() + 1;
					var dd = new Date(data[i].date).getDate();

					obj[i].date = dy + '-' + ( ( dm >= 1 && dm <= 9 ) ? '0' + dm : dm ) + '-' + ( ( dd >= 1 && dd <= 9 ) ? '0' + dd : dd );
					
				}

				$scope.obj = obj;
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});

		$scope.create = function() {
			$http.post('/reports/' + $stateParams.reportId + '/creativeWorks', {
				'creativeWorks': {
					name: $scope.name,
					jointEfforts: $scope.jointEfforts.split(','),
					description: $scope.description,
					website: $scope.website,
					date: $scope.date
				}
			}).
			success(function(data, status, headers, config) {
				console.log(data);
				alert('created');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});
		};
	}
]);