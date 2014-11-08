'use strict';

// Reports controller
var app = angular.module('reports');

app.controller('ReportsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Reports',
	function($scope, $http, $stateParams, $location, Authentication, Reports ) {
		$scope.authentication = Authentication;
		
		
		// Create new Report
		$scope.create = function() {
			// Create new Report object
			var report = new Reports ({
				reportName: this.reportName,

				name: {
					firstName: this.firstName,
					middleName: this.middleName,
					lastName: this.lastName
				},

				tenure: {
					tenure: this.tenure
				},

				currentRank: {
					rank: this.currentRank,
					department: this.department
				},

				dateAppointed: {
					date: this.dateAppointed
				},

				affiliateAppointments: {
					appointments: this.affiliateAppointments
				},

				assignedActivity: {
					year: this.year,

					springTeaching: this.springTeaching,
					springResearch: this.springResearch,
					springService: this.springService,

					fallTeaching: this.fallTeaching,
					fallResearch: this.fallResearch,
					fallService: this.fallService,

					summerTeaching: this.summerTeaching,
					summerResearch: this.summerResearch,
					summerService: this.summerService
				},

				teachingAdvising: {
					advising: this.teachingAdvising
				},

				teachingEvaluation: this.teachingEvaluationArray,

				graduateCommittee: this.graduateCommitteeArray,

				creativeWorks: this.creativeWorksArray, //this is an array of objects

				patents: this.patentsArray, //this is an array of objects
				
				contribution: {
					info: this.contribution
				},

				conferences: this.conferencesArray,

				contracts: this.contractsArray,
				
				consultationsOutsideUniversity: {
					consultation: this.consultationsOutsideUniversity
				},
				
				honors: {
					info: this.honors
				},
				
				furtherInformationSection: {
					info: this.furtherInformationSection
				},
				
				serviceToSchools: {
					service: this.serviceToSchools
				},
				
				membership: {
					info: this.membership
				},

				international: {
					activities: this.international
				},
				
				governance: {
					govStr: this.governance
				},
				
				editorServiceReviewer: {
					info: this.editorServiceReviewer
				}



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
			if ( report ) { 
				report.$remove();

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
			var report = $scope.report;

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

		// Download existing report
		$scope.download = function() {
			if ($scope.report) {
				$http.get('/reportdownload/' + $scope.report._id).
					success(function(data, status, headers, config) {
						window.open('/modules/reports/pdf/' + $scope.report._id + '.pdf', '_blank', '');
					}).
					error(function(data, status, headers, config) {
						console.log('error');
					});
			}
		};
	}
]);
