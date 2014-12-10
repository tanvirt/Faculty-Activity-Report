'use strict';

(function() {
	// Section 16 Controller Spec
	describe('Section 16 Controller Tests', function() {
		// Initialize global variables
		var Section16Controller,
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

			// Initialize the Section 16 controller.
			Section16Controller = $controller('Section16Controller', {
				$scope: scope
			});
		}));

		it('Should successfully submit a POST to the backend', inject(function(Section16) {
			// Create a fake Governance object
			var fakeGovernance = new Section16({
				govStr: 'This is all test information.'
			});

			// Create a Governance response
			var fakeGovernanceResponse = new Section16({
				govStr: 'This is all test information.'
			});

			// Fixture mock form input values
			scope.govStr = 'This is all test information';

			// Set POST response
			$httpBackend.expectPOST('reports', fakeGovernance).respond(fakeGovernanceResponse);

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.govStr).toEqual('');
		}));
	});
}());