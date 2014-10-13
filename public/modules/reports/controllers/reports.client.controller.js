'use strict';

// Reports controller
angular.module('reports').controller('ReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports',
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
		// Create new Report
		$scope.create = function() {
			// Create new Report object
			var report = new Reports ({
				name: this.name
			});

			// Redirect after save
			report.$save(function(response) {
				$location.path('reports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Report
		$scope.remove = function( report ) {
			if ( report ) { report.$remove();

				for (var i in $scope.reports ) {
					if ($scope.reports [i] === report ) {
						$scope.reports.splice(i, 1);
					}
				}
			} else {
				$scope.report.$remove(function() {
					$location.path('reports');
				});
			}
		};

		// Update existing Report
		$scope.update = function() {
			var report = $scope.report ;

			report.$update(function() {
				$location.path('reports/' + report._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Reports
		$scope.find = function() {
			$scope.reports = Reports.query();
		};

		// Find existing Report
		$scope.findOne = function() {
			$scope.report = Reports.get({ 
				reportId: $stateParams.reportId
			});
		};
	}
]);