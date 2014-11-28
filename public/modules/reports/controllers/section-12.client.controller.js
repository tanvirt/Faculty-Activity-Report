'use strict';

function parsePatentsData( data, i ) {
	console.log(data);
	var obj = {};
	
	obj.title = data[i].title;
				
	if ( data[i].authors.length !== 0 ) {
		obj.authors = data[i].authors[0];
	} else {
		obj.authors = '';
	}

	for (var j=1; j<data[i].authors.length; j++) {
		obj.authors = obj.authors + ', ' + data[i].authors[j];
	}

	obj.patentNumber = data[i].patentNumber;

	var dy = new Date(data[i].date).getFullYear();
	var dm = new Date(data[i].date).getMonth() + 1;
	var dd = new Date(data[i].date).getDate();

	obj.date = dy + '-' + ( ( dm >= 1 && dm <= 9 ) ? '0' + dm : dm ) + '-' + ( ( dd >= 1 && dd <= 9 ) ? '0' + dd : dd );

	obj.description = data[i].description;

	obj.id = data[i]._id;

	return obj;
}

angular.module('reports').controller('Section12Controller', ['$scope', '$http', '$stateParams', '$location', 'Authentication',
	function($scope, $http, $stateParams, $location, Authentication) {
		$scope.authentication = Authentication;

		$http.get('/reports/' + $stateParams.reportId + '/patents').
			success(function(data, status, headers, config) {
				console.log(data);
				var obj = [];

				for (var i=0; i<data.length; i++) {
					obj[i] = parsePatentsData(data, i);
				}

				$scope.obj = obj;
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});

		$scope.create = function() {
			$http.post('/reports/' + $stateParams.reportId + '/patents', {
				patents: {
					title: $scope.title,
					authors: $scope.authors.split(','),
					patentNumber: $scope.patentNumber,
					date: $scope.date,
					description: $scope.description
				}
			}).
			success(function(data, status, headers, config) {
				$scope.obj.push(parsePatentsData([data], 0)); //add to the DOM
				$scope.title = '';
				$scope.authors = '';
				$scope.description = '';
				$scope.patentNumber = '';
				$scope.date = '';

				alert('created');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in creating the report');
			});
		};

		$scope.delete = function( id, i ) {
			$http.delete('/patents/' + id).
			success(function(data, status, headers, config) {
				$scope.obj.splice(i, 1); //remove from the DOM
				alert('deleted');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in deleting the report');
			});
		};

		$scope.update = function( id, i ) {
			$http.put('/patents/' + id, {
				patents: {
					title: $scope.obj[i].title,
					authors: $scope.obj[i].authors.split(','),
					patentNumber: $scope.obj[i].patentNumber,
					date: $scope.obj[i].date,
					description: $scope.obj[i].description
				}
			}).
			success(function(data, status, headers, config) {
				alert('updated');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in updating the report');
			});
		};
	}
]);