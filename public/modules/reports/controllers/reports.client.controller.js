'use strict';

// Reports controller
angular.module('reports').controller('ReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports',
	function($scope, $stateParams, $location, Authentication, Reports ) {
		$scope.authentication = Authentication;
		//variable for section 15 to initialize the table
		$scope.grants = 
         	[{
         		titleOfGrant:"Faculty Grants",
         		fundingAgency:"EOF",
         		PI:"Willy Nelson",
         		startEnd:"01/13/2014",
         		value:200	
         	}];

//functions for section 6 assigned_activity
        $scope.springUpdate = function()
        {
             $scope.springTotal = $scope.springTeaching + $scope.springResearch + $scope.springService;
        };

        $scope.summerUpdate = function()
        {
            $scope.summerTotal = $scope.summerTeaching + $scope.summerResearch + $scope.summerService;
        };

        $scope.fallUpdate = function()
        {
            $scope.fallTotal = $scope.fallTeaching + $scope.fallResearch + $scope.fallService;
        };
        $scope.initTable = function(){
            //Spring values
            $scope.springTeaching = 0;
            $scope.springResearch = 0;
            $scope.springService = 0;
            //Summer values

            $scope.summerTeaching = 0;
            $scope.summerResearch = 0;
            $scope.summerService = 0;
            //Fall Values
            $scope.fallTeaching = 0;
            $scope.fallResearch = 0;
            $scope.fallService = 0;
            //table totals
            $scope.springTotal = 0;
            $scope.summerTotal = 0;
            $scope.fallTotal = 0;
        };

        //functions for section 15 contracts_grants

        // function for button "Add Entry" to add grants to the table  
        $scope.addGrants = function(){
         		$scope.grants.push({titleOfGrant: $scope.grants.titleOfGrant , fundingAgency: $scope.grants.fundingAgency, PI: $scope.grants.PI, value:$scope.grants.value, startEnd: $scope.grants.startEnd});
         		$scope.grants.titleOfGrant = "";
         		$scope.grants.fundingAgency = "";
         		$scope.grants.PI = "";
         		$scope.grants.value= "";
         		$scope.grants.startEnd="";
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