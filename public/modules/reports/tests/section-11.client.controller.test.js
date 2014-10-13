'use strict';

(function() {
	// Section 11 Controller Spec
	describe('Section 11 Controller Tests', function() {
		// Initialize global variables
		var Section11Controller,
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

			// Initialize the Section 11 controller.
			Section11Controller = $controller('Section11Controller', {
				$scope: scope
			});
		}));

		it('$scope.createCreativeWorks() with valid form data should send a POST request with the form input values', inject(function(CreativeWorks) {
			// Create a sample CreativeWork object
			var sampleCreativeWorkPostData = new CreativeWorks({
				name: 'New Creative Work',
				description: 'Description',
				website: 'www.website.com',
				jointEfforts: 'John Doe',
				date: '11/11/2011'
			});

			// Create a sample CreativeWork response
			var sampleCreativeWorkResponse = new CreativeWorks({
				name: 'New Creative Work',
				description: 'Description',
				website: 'www.website.com',
				jointEfforts: 'John Doe',
				date: '11/11/2011'
			});

			// Fixture mock form input values
			scope.name = 'New Creative Work';
			scope.description = 'Description';
			scope.website = 'www.website.com';
			scope.jointEfforts = 'John Doe';
			scope.date = '11/11/2011';

			// Set POST response
			$httpBackend.expectPOST('reports', sampleCreativeWorkPostData).respond(sampleCreativeWorkResponse);

			// Run controller functionality
			scope.createCreativeWorks();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');
			expect(scope.description).toEqual('');
			expect(scope.website).toEqual('');
			expect(scope.jointEfforts).toEqual('');
			expect(scope.date).toEqual('');
		}));
		
	});
}());