'use strict';

(function() {
	// Section 15 Controller Spec
	describe('Section 15 Controller Tests', function() {
		// Initialize global variables
		var Section15Controller,
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

			// Initialize the Section 15 controller.
			Section15Controller = $controller('Section15Controller', {
				$scope: scope
			});
		}));

		it('testing addGrants() to initialize the form with the correct input', inject(function() {
			
			   scope.grants.titleOfGrant = 'The Grant';
               scope.grants.fundingAgency = 'The Agency';
               scope.grants.PI = 'Santiago';
               scope.grants.value = 345;
               scope.grants.startEnd = '';
               //scope.hideTable = false;
               
               scope.addGrants();

               expect(scope.grants.titleOfGrant).toBe('');
               expect(scope.grants.fundingAgency).toBe('');
               expect(scope.grants.PI).toBe('');
               expect(scope.grants.value).toBe('');
               expect(scope.grants.startEnd).toBe('');
               //expect(scope.grants.hideTable).toBe(false);

		}));
	});
}());