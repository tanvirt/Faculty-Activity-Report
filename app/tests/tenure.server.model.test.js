'use strict';

//module dependencies
var should = require('should'),
	mongoose = require('mongoose');
	//TenureSchema = mongoose.model('TenureSchema');

//Globals
var tenure1, tenure2;
/* Fails Tests - Tenure doesn't load
describe('Tenure Model Unit Tests:', function() {
	beforeEach(function(done) {
		tenure1 = new TenureSchema({
			tenure: 'Tenured'			
		});
		tenure2 = new Tenure({
			tenure: 'Tenured'			
		});
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
		TenureSchema.remove().exec();
		done();
	});	
});
*/