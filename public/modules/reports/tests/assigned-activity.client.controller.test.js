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

			scope.summerUpdate();
			expect(scope.summerTotal).toBe(100);
		});
		it('Testing fallUpdate() functionality if the fall total adds up to 100', function() {
			scope.fallTeaching = 65;
			scope.fallResearch = 25;
			scope.fallService = 10;

			scope.fallUpdate();
			expect(scope.fallTotal).toBe(100);
		});
		it('testing springUpdate() functionality with no inputs to evaluate the value of springTotal', function(){
			scope.springUpdate();
			expect(scope.springTotal).toBe(0);
		});
		it('testing summerUpdate() functionality with no inputs to evaluate the value of summerTotal', function() {
			scope.summerUpdate();
			expect(scope.summerTotal).toBe(0);
		});
		it('testing fallUpdate() functionality with no inputs to evaluate the value of fallTotal', function() {
			scope.fallUpdate();
			expect(scope.fallTotal).toBe(0);
		});
		it('testing springUpdate() to return an error if the sum is grater than 100', function(){
			scope.springTeaching = 80;
			scope.springService = 80;
			scope.springResearch = 80;
			scope.springUpdate();

			expect(scope.springTotal).toBe('e');
		});
		it('testing summerUpdate() to return an error if the sum is grater than 100', function(){
			scope.summerTeaching = 80;
			scope.summerService = 80;
			scope.summerResearch = 80;
			scope.summerUpdate();

			expect(scope.summerTotal).toBe('e');
		});
		it('testing fallUpdate() to return an error if the sum is grater than 100', function(){
			scope.fallTeaching = 80;
			scope.fallService = 80;
			scope.fallResearch = 80;
			scope.fallUpdate();

			expect(scope.fallTotal).toBe('e');
		});
		it('testing springUpdate() with negative values', function(){
			scope.springTeaching = -10;
			scope.springResearch = -40;
			scope.springService = -50;
			scope.springUpdate();

			expect(scope.springTotal).toBe(0);
		});

		it('testing summerUpdate() with negative values', function(){
			scope.summerTeaching = -10;
			scope.summerResearch = -40;
			scope.summerService = -50;
			scope.summerUpdate();

			expect(scope.summerTotal).toBe(0);
		});

		it('testing fallUpdate() with negative values', function(){
			scope.fallTeaching = -10;
			scope.fallResearch = -40;
			scope.fallService = -50;
			scope.fallUpdate();

			expect(scope.fallTotal).toBe(0);
		});

		it('testing springUpdate() with NON-NUMERICAL values', function(){
			scope.springTeaching = [];
			scope.springTeaching = {};
			scope.springTeaching = '80';
			scope.springUpdate();

			expect(scope.springTotal).toBe('e');
		});

		it('testing summerUpdate() with NON-NUMERICAL values', function(){
			scope.summerTeaching = [];
			scope.summerTeaching = {};
			scope.summerTeaching = '80';
			scope.summerUpdate();

			expect(scope.summerTotal).toBe('e');
		});

		it('testing fallUpdate() with NON-NUMERICAL values', function(){
			scope.fallTeaching = [];
			scope.fallTeaching = {};
			scope.fallTeaching = '80';
			scope.fallUpdate();

			expect(scope.fallTotal).toBe('e');
		});


	});
}());
