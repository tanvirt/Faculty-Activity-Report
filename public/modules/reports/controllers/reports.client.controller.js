'use strict';

// Reports controller
var app = angular.module('reports');

app.controller('ReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports',
	function($scope, $stateParams, $location, Authentication, Reports ) {
		
		//custom tinymce textarea
		$scope.tinymceOptions = {
			    theme: 'modern',
			    plugins: [
			        'autoresize',
			        'advlist autolink lists charmap preview hr',
			        'searchreplace wordcount',
			        'insertdatetime save table contextmenu directionality',
			        'paste textcolor colorpicker textpattern',
			    ],
			    toolbar1: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist',
		};

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
				reportName: this.reportName
			});

			// Redirect after save
			report.$save(function(response) {
				$location.path('reports/' + response._id);

				// Clear form fields
				$scope.reportName = '';
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

app.directive('profile', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/profile.client.view.html'
    };
});

app.directive('assignedActivity', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/assigned-activity.client.view.html'
    };
});

app.directive('section7', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-7.client.view.html'
    };
});

app.directive('section10', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-10.client.view.html'
    };
});

app.directive('section11', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-11.client.view.html'
    };
});

app.directive('section12', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-12.client.view.html'
    };
});

app.directive('section13', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-13.client.view.html'
    };
});

app.directive('section14', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-14.client.view.html'
    };
});

app.directive('section15', function(){
    return {
      restrict: 'E',
      templateUrl: 'modules/reports/views/section-15.client.view.html'
    };
});

app.directive('section16', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/reports/views/section-16.client.view.html'
	};
});

app.directive('section17', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/reports/views/section-17.client.view.html'
	};
});

app.directive('section18', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/reports/views/section-18.client.view.html'
	};
});

app.directive('section19', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/reports/views/section-19.client.view.html'
	};
});
