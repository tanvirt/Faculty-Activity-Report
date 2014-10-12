'use strict';

angular.module('reports').controller('Section15Controller', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication, Reports ) {


		$scope.authentication = Authentication;
		
		//variable for section 15 to initialize the table
		$scope.grants = 
         	[{
         		titleOfGrant:'Faculty Grants',
         		fundingAgency:'EOF',
         		PI:'Willy Nelson',
         		startEnd:'01/13/2014',
         		value:200	
         	}];
        $scope.addGrants = function(){
         		$scope.grants.push({titleOfGrant: $scope.grants.titleOfGrant , fundingAgency: $scope.grants.fundingAgency, PI: $scope.grants.PI, value:$scope.grants.value, startEnd: $scope.grants.startEnd});
         		$scope.grants.titleOfGrant = '';
         		$scope.grants.fundingAgency = '';
         		$scope.grants.PI = '';
         		$scope.grants.value= '';
         		$scope.grants.startEnd='';
         	};
		
	}
]);
