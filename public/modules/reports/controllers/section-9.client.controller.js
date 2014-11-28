'use strict';

function parseGradData( data, i ) {
	var obj = {};
	
	obj.role = data[i].role;
	obj.studentName = data[i].studentName;
	obj.degree = data[i].degree;
				
	obj.major = data[i].major;
	obj.responses = data[i].responses;
	
	var dy = new Date(data[i].degreeDate).getFullYear();
	var dm = new Date(data[i].degreeDate).getMonth() + 1;
	var dd = new Date(data[i].degreeDate).getDate();

	obj.degreeDate = dy + '-' + ( ( dm >= 1 && dm <= 9 ) ? '0' + dm : dm ) + '-' + ( ( dd >= 1 && dd <= 9 ) ? '0' + dd : dd );

	obj.id = data[i]._id;

	return obj;
}

angular.module('reports').controller('Section9Controller', ['$http', '$scope', '$stateParams', '$location', 'Authentication',
	function($http, $scope, $stateParams, $location, Authentication ) {
		$scope.authentication = Authentication;
		
		$http.get('/reports/' + $stateParams.reportId + '/graduateCommittee').
			success(function(data, status, headers, config) {
				var obj = [];

				for (var i=0; i<data.length; i++) {
					obj[i] = parseGradData(data, i);
				}

				$scope.obj = obj;
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});	

		$scope.create = function() {
			$http.post('/reports/' + $stateParams.reportId + '/graduateCommittee', {
				graduateCommittee: {
					role: $scope.role,
					studentName: $scope.studentName,
					degree: $scope.degree,
					major: $scope.major,
					degreeDate: $scope.degreeDate
				}
			}).
			success(function(data, status, headers, config) {
				$scope.obj.push(parseGradData([data], 0)); //add to the DOM
				
				$scope.role = '';
				$scope.studentName = '';
				$scope.degree = '';
				$scope.major = '';
				$scope.degreeDate = '';

				alert('created');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in creating the report');
			});
		};

		$scope.delete = function( id, i ) {
			$http.delete('/graduateCommittee/' + id).
			success(function(data, status, headers, config) {
				$scope.obj.splice(i, 1); //remove from the DOM
				alert('deleted');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in deleting the report');
			});
		};

		$scope.update = function( id, i ) {
			$http.put('/graduateCommittee/' + id, {
				graduateCommittee: {
					role: $scope.obj[i].role,
					studentName: $scope.obj[i].studentName,
					degree: $scope.obj[i].degree,
					major: $scope.obj[i].major,
					degreeDate: $scope.obj[i].degreeDate
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
