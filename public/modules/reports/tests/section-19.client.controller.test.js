'use strict';

(function() {
	// Section 19 Controller Spec
	describe('Section 19 Controller Tests', function() {
		// Initialize global variables
		var Section19Controller,
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

			// Initialize the Section 19 controller.
			Section19Controller = $controller('Section19Controller', {
				$scope: scope
			});
		}));

		it('Should successfully submit a POST to the backend', inject(function(Section19) {
			// Create a fake International object
			var fakeInternational = new Section19({
				activities: 'This is all test information for the international section.'
			});

			// Create a International response
			var fakeInternationalResponse = new Section19({
				activities: 'This is all test information for the international section.'
			});

			// Fixture mock form input values
			scope.activities = 'This is all test information for the international section.';

			// Set POST response
			$httpBackend.expectPOST('reports', fakeInternational).respond(fakeInternationalResponse);

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.activities).toEqual('');
		}));
	});
}());