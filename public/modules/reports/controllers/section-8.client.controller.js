'use strict';

function arrayToString( arr ) {
	var str = '';

	if ( arr.length !== 0 ) {
		str = arr[0];
	}

	for (var i=1; i<arr.length; i++) {
		str = str + ', ' + arr[i];
	}

	return str;
}

function parseEvalData( data, i ) {
	var obj = {};
	
	obj.course = data[i].course;
	obj.year = data[i].year;
	obj.semester = data[i].semester;
				
	obj.enrolled = data[i].enrolled;
	obj.responses = data[i].responses;
	obj.required = data[i].required;	

	// Parse Teacher Mean Array
	obj.teacherMean = arrayToString( data[i].teacherMean );

	// Parse Department Mean Array
	obj.departmentMean = arrayToString( data[i].departmentMean );

	// Parse College Mean Array
	obj.collegeMean = arrayToString( data[i].collegeMean );

	obj.id = data[i]._id;

	return obj;
}

angular.module('reports').controller('Section8Controller', ['$http', '$scope', '$stateParams', '$location', 'Authentication',
	function($http, $scope, $stateParams, $location, Authentication ) {
		$scope.authentication = Authentication;
		
		$http.get('/reports/' + $stateParams.reportId + '/teachingEvaluation').
			success(function(data, status, headers, config) {
				var obj = [];

				for (var i=0; i<data.length; i++) {
					obj[i] = parseEvalData(data, i);
				}

				$scope.obj = obj;
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in getting report');
			});	

		$scope.create = function() {
			$http.post('/reports/' + $stateParams.reportId + '/teachingEvaluation', {
				teachingEvaluation: {
					course: $scope.course,
					year: $scope.year,
					semester: $scope.semester,
					enrolled: $scope.enrolled,
					responses: $scope.responses,
					required: $scope.required,
					teacherMean: $scope.teacherMean.split(','),
					departmentMean: $scope.departmentMean.split(','),
					collegeMean: $scope.collegeMean.split(',')
				}
			}).
			success(function(data, status, headers, config) {
				$scope.obj.push(parseEvalData([data], 0)); //add to the DOM
				
				$scope.course = '';
				$scope.year = '';
				$scope.semester = '';
				$scope.enrolled = '';
				$scope.responses = '';
				$scope.required = '';
				$scope.teacherMean = '';
				$scope.departmentMean = '';
				$scope.collegeMean = '';

				alert('created');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in creating the report');
			});
		};

		$scope.delete = function( id, i ) {
			$http.delete('/teachingEvaluation/' + id).
			success(function(data, status, headers, config) {
				$scope.obj.splice(i, 1); //remove from the DOM
				alert('deleted');
			}).
			error(function(data, status, headers, config) {
				console.log('There was an error in deleting the report');
			});
		};

		$scope.update = function( id, i ) {
			$http.put('/teachingEvaluation/' + id, {
				teachingEvaluation: {
					course: $scope.obj[i].course,
					year: $scope.obj[i].year,
					semester: $scope.obj[i].semester,
					enrolled: $scope.obj[i].enrolled,
					responses: $scope.obj[i].responses,
					required: $scope.obj[i].required,
					teacherMean: $scope.obj[i].teacherMean.split(','),
					departmentMean: $scope.obj[i].departmentMean.split(','),
					collegeMean: $scope.obj[i].collegeMean.split(',')
				}
			}).
			success(function(data, status, headers, config) {
				alert('updated');
			}).
			error(function(data, status, headers, config) {
				console.log(data);
				console.log('There was an error in updating the report');
			});
		};
	}
]);
