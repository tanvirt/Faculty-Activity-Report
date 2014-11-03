'use strict';

(function() {
	// Assigned activity Controller Spec
	describe('Assigned activity Controller Tests', function() {
		// Initialize global variables
		var AssignedActivityController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Assigned activity controller.
			AssignedActivityController = $controller('AssignedActivityController', {
				$scope: scope
			});
		}));

		it('Testing springUpdate() functionality if the spring total adds up to 100', function() {
			scope.springTeaching = 50;
			scope.springResearch = 40;
			scope.springService = 10;

			scope.springUpdate();
			expect(scope.springTotal).toBe(100);

		});
		it('Testing summerUpdate() functionality if the summer total adds up to 100', function() {
			scope.summerTeaching = 10;
			scope.summerResearch = 80;
			scope.summerService = 10;

			scope.summerUpdate()
			expect(scope.summerTotal).toBe(100);
		});
		it('Testing fallUpdate() functionality if the fall total adds up to 100', function() {
			scope.fallTeaching = 65;
			scope.fallResearch = 25;
			scope.fallService = 10;

			scope.fallUpdate()
			expect(scope.fallTotal).toBe(100);
		});

	});
}());
