'use strict';

//module dependencies
var should = require('should'),
	mongoose = require('mongoose'),
	Tenure = mongoose.model('Tenure');

//Globals
var tenure1, tenure2;
/* Fails Tests - Tenure doesn't load */
describe('Tenure Model Unit Tests:', function() {
	beforeEach(function(done) {
		tenure1 = new Tenure({
			tenure: 'Tenured'			
		});
		tenure2 = new Tenure({
			tenure: 'Tenured'			
		});
		done();
	});

	describe('Method Save', function() {
		
		it('should save without problems', function(done) {
			tenure1.save();
			done();
		});
	
		
		it('should fail to save is tenure is not Tenured or Not Tenured', function(done) {
			tenure1.tenure = 'I think I am employed';
			return tenure1.save(function(err) {
				should.exist(err);
				done();
			});
		});	

	});

	
	afterEach(function(done) {
		Tenure.remove().exec();
		done();
	});	
});
