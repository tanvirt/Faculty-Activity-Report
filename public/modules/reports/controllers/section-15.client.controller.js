'use strict';

function parseDate( date ) {
   var dy = new Date(date).getFullYear();
   var dm = new Date(date).getMonth() + 1;
   var dd = new Date(date).getDate();

   return dy + '-' + ( ( dm >= 1 && dm <= 9 ) ? '0' + dm : dm ) + '-' + ( ( dd >= 1 && dd <= 9 ) ? '0' + dd : dd );
}

function parseContractData( data, i ) {
   var obj = {};

   obj.title = data[i].title;
   obj.funded = data[i].funded;
   obj.PI = data[i].PI;

   obj.startDate = parseDate(data[i].startDate);
   obj.endDate = parseDate(data[i].endDate);

   obj.fundingAgency = data[i].fundingAgency;
   obj.fundingPortion = data[i].fundingPortion;
   obj.value = data[i].value;

   obj.id = data[i]._id;

   return obj;
}

angular.module('reports').controller('Section15Controller', ['$scope', '$http', '$stateParams', '$location', 'Authentication',
	function($scope, $http, $stateParams, $location, Authentication ) {
		$scope.authentication = Authentication;
		

		//variable for section 15 to initialize the table
		$scope.incomplete = false;
      $scope.hideTable = false;

      $scope.total = 0;

      $http.get('/reports/' + $stateParams.reportId + '/contracts').
         success(function(data, status, headers, config) {
            var obj = [];

            for (var i=0; i<data.length; i++) {
               obj[i] = parseContractData(data, i);
               $scope.total += data[i].fundingPortion;
            }

            $scope.obj = obj;
            console.log(data);
         }).
         error(function(data, status, headers, config) {
            console.log('There was an error in getting report');
         });
      
      $scope.create = function() {
         $http.post('/reports/' + $stateParams.reportId + '/contracts', {
            contracts: {
               title: $scope.title,
               funded: $scope.funded,
               PI: $scope.PI,
               startDate: $scope.startDate,
               endDate: $scope.endDate,
               fundingAgency: $scope.fundingAgency,
               fundingPortion: $scope.fundingPortion,
               value: $scope.value
            }
         }).
         success(function(data, status, headers, config) {
            $scope.total = $scope.total + $scope.fundingPortion;

            $scope.obj.push(parseContractData([data], 0));
            $scope.title = '';
            $scope.funded = '';
            $scope.PI = '';
            $scope.startDate = '';
            $scope.endDate = '';
            $scope.fundingAgency = '';
            $scope.fundingPortion = '';
            $scope.value = '';

            alert('Created!');
         }).
         error(function(data, status, headers, config) {
            console.log('There was an error in creating the report: ');
            console.log(data);
         });
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
      }; */
   }
]);
