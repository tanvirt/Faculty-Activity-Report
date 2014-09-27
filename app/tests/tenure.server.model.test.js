'use strict';

//module dependencies
var should = require('should'),
	mongoose = require('mongoose'),
	Tenure = mongoose.model('tenureSchema');
	
//Globals
var tenure1, tenure2;

describe('Tenure Model Unit Tests:', function() {
	beforeEach(function(done) {
		tenure1 = new Tenure({
			_id: '5421bc631b303e101ec67747',
			tenure: 'Tenured'			
		});
		tenure2 = new Tenure({
			_id: '5421bc631b303e101ec67747',
			tenure: 'Tenured'			
		});
	});
	
	describe('Method Save', function() {
		it('should save without problems', function(done) {
			tenure1.save();
			done();
		});
		
		it('should fail to save twice', function(done) {
			tenure1.save();
			return tenure2.save(function(err) {
				should.exist(err);
				done();
			});
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