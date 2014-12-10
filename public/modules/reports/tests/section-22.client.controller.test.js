'use strict';

(function() {
	// Section 22 Controller Spec
	describe('Section 22 Controller Tests', function() {
		// Initialize global variables
		var Section22Controller,
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

			// Initialize the Section 22 controller.
			Section22Controller = $controller('Section22Controller', {
				$scope: scope
			});
		}));

		it('Should successfully submit a POST to the backend', inject(function(Section22) {
			// Create a fake Honors object
			var fakeHonors = new Section22({
				info: 'This is all test information for the Honors section.'
			});

			// Create a Honors response
			var fakeHonorsResponse = new Section22({
				info: 'This is all test information for the Honors section.'
			});

			// Fixture mock form input values
			scope.info = 'This is all test information for the Honors section.';

			// Set POST response
			$httpBackend.expectPOST('reports', fakeHonors).respond(fakeHonorsResponse);

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.info).toEqual('');
		}));
	});
}());