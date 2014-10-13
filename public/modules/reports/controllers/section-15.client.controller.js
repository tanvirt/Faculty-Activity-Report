'use strict';

angular.module('reports').controller('Section15Controller', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication, Reports ) {


		$scope.authentication = Authentication;
		
		//variable for section 15 to initialize the table
		$scope.incomplete = false;
      $scope.hideTable = true;
      $scope.grants = 
            [{
               titleOfGrant:null,
               fundingAgency:null,
               PI:null,
               startEnd:null,
               value:null,
            }];
        $scope.addGrants = function(){
               $scope.grants.push({titleOfGrant: $scope.grants.titleOfGrant , fundingAgency: $scope.grants.fundingAgency, PI: $scope.grants.PI, value:$scope.grants.value, startEnd: $scope.grants.startEnd});
               $scope.grants.titleOfGrant =null;
               $scope.grants.fundingAgency =null;
               $scope.grants.PI =null;
               $scope.grants.value=null;
               $scope.grants.startEnd=null;
               $scope.hideTable = false;

            };

        $scope.$watch('grants.titleOfGrant',function(){$scope.test();});
      $scope.$watch('grants.fundingAgency',function() {$scope.test();});
      $scope.$watch('grants.PI',function() {$scope.test();});
      $scope.$watch('grants.value',function() {$scope.test();});
      $scope.$watch('grants.startEnd',function() {$scope.test();});

      $scope.test = function() {
         $scope.incomplete = true;
         $scope.incomplete = false;
         if($scope.grants.value <= 0 || !$scope.grants.titleOfGrant.length||!$scope.grants.fundingAgency.length||!$scope.grants.PI.length||!$scope.grants.startEnd.length){
            $scope.incomplete = true;
         }
      };
	}
]);
