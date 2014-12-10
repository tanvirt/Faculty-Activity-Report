'use strict';

(function() {
	// Section 17 Controller Spec
	describe('Section 17 Controller Tests', function() {
		// Initialize global variables
		var Section17Controller,
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

			// Initialize the Section 17 controller.
			Section17Controller = $controller('Section17Controller', {
				$scope: scope
			});
		}));

		it('Should successfully submit a POST to the backend', inject(function(Section17) {
			// Create a fake ConsultationsOutsidetheUniversity object
			var fakeConsultationsOutsidetheUniversity = new Section17({
				consultations: 'This is all test information for the consultations outside the unversity section.'
			});

			// Create a ConsultationsOutsidetheUniversity response
			var fakeConsultationsOutsidetheUniversityResponse = new Section17({
				consultations: 'This is all test information for the consultations outside the unversity section.'
			});

			// Fixture mock form input values
			scope.govStr = 'This is all test information for the consultations outside the unversity section.';

			// Set POST response
			$httpBackend.expectPOST('reports', fakeConsultationsOutsidetheUniversity).respond(fakeConsultationsOutsidetheUniversityResponse);

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.consultations).toEqual('');
		}));
	});
}());