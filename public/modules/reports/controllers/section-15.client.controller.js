'use strict';

angular.module('reports').controller('Section15Controller', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication, Reports ) {


		$scope.authentication = Authentication;
		

		//variable for section 15 to initialize the table
		$scope.incomplete = false;
      $scope.hideTable = true;

      $scope.grants = 
            [{
               titleOfGrant:'',
               fundingAgency:'',
               PI:'',
               startEnd:'',
               value:'',
            }];


         //When the add grant button is pressed this function is called.
        $scope.addGrants = function(){
               $scope.grants.push({titleOfGrant: $scope.grants.titleOfGrant , fundingAgency: $scope.grants.fundingAgency, PI: $scope.grants.PI, value:$scope.grants.value, startEnd: $scope.grants.startEnd});
               $scope.grants.titleOfGrant = '';
               $scope.grants.fundingAgency = '';
               $scope.grants.PI = '';
               $scope.grants.value = '';
               $scope.grants.startEnd = '';
               $scope.hideTable = false;
            };

       /*
      //Function to look for changes that are happening in the Grants object.
      $scope.$watch('grants.titleOfGrant',function(){$scope.test();});
      $scope.$watch('grants.fundingAgency',function() {$scope.test();});
      $scope.$watch('grants.PI',function() {$scope.test();});
      $scope.$watch('grants.value',function() {$scope.test();});
      $scope.$watch('grants.startEnd',function() {$scope.test();});

       //to watch whether these strings are empty, in order to check for completion of forms to enable button
      $scope.test = function() {
         $scope.incomplete = true;
         $scope.incomplete = false;
         if($scope.grants.value <= 0 || !$scope.grants.titleOfGrant.length||!$scope.grants.fundingAgency.length||!$scope.grants.PI.length||!$scope.grants.startEnd.length){
            $scope.incomplete = true;
         }
      */


	}
]);
