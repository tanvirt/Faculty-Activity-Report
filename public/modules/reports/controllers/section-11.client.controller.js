'use strict';

function parseData( data, i ) {
	var obj = {};
	
	obj.name = data[i].name;
	obj.description = data[i].description;
	obj.website = data[i].website;
				
	if ( data[i].jointEfforts.length !== 0 ) {
		obj.jointEfforts = data[i].jointEfforts[0];
	} else {
		obj.jointEfforts = '';
	}

	for (var j=1; j<data[i].jointEfforts.length; j++) {
		obj.jointEfforts = obj.jointEfforts + ', ' + data[i].jointEfforts[j];
	}

	var dy = new Date(data[i].date).getFullYear();
	var dm = new Date(data[i].date).getMonth() + 1;
	var dd = new Date(data[i].date).getDate();

	obj.date = dy + '-' + ( ( dm >= 1 && dm <= 9 ) ? '0' + dm : dm ) + '-' + ( ( dd >= 1 && dd <= 9 ) ? '0' + dd : dd );

	obj._id = data[i]._id;

	return obj;
}

angular.module('reports').controller('Section11Controller', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'IDs',
	function($scope, $http, $stateParams, $location, Authentication, IDs) {
		$scope.authentication = Authentication;

		$http.get('/reports/' + $stateParams.reportId + '/creativeWorks').
			success(function(data, status, headers, config) {
				var obj = [];

				for (var i=0; i<data.length; i++) {
					obj[i] = parseData(data, i);
				}

				$scope.obj = obj;
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});

		$scope.create = function() {
			$http.post('/reports/' + $stateParams.reportId + '/creativeWorks', {
				creativeWorks: {
					name: $scope.name,
					jointEfforts: $scope.jointEfforts.split(','),
					description: $scope.description,
					website: $scope.website,
					date: $scope.date
				}
			}).
			success(function(data, status, headers, config) {
				console.log(data);
				$scope.obj.push(parseData([data], 0)); //add to the DOM
				$scope.name = '';
				$scope.jointEfforts = '';
				$scope.description = '';
				$scope.website = '';
				$scope.date = '';

				alert('created');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in creating the report');
			});
		};

		$scope.delete = function( id, i ) {
			$http.delete('/creativeWorks/' + id).
			success(function(data, status, headers, config) {
				$scope.obj.splice(i, 1); //remove from the DOM
				alert('deleted');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in deleting the report');
			});
		};

		$scope.update = function( id, i ) {
			$http.put('/creativeWorks/' + id, {
				creativeWorks: {
					name: $scope.obj[i].name,
					jointEfforts: $scope.obj[i].jointEfforts.split(','),
					description: $scope.obj[i].description,
					website: $scope.obj[i].website,
					date: $scope.obj[i].date
				}
			}).
			success(function(data, status, headers, config) {
				alert('updated');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in updating the report');
			});
		}
	}
]);