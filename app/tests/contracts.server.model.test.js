'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Contracts = mongoose.model('Contracts');

var contract1;
	
describe('Contract Model Unit Tests:', function() {
	beforeEach(function(done) {
		contract1 = new Contracts({
			title: 'Big Project',
			funded: 'externally',
			fundingAgency: 'AAA',
			PI: 'PI',
			startDate: '01/22/1998',
			endDate: '04/06/2010',
			value: 200000, //200,000
			fundingPortion: 10
		});
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems', function(done) {
			contract1.save();
			done();
		});
		
		it('should fail to save without title', function(done) {
			contract1.title = '';
			return contract1.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save inappropriate funded', function(done) {
			contract1.funded = 'my mom paid for it';
			return contract1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with an invalid startDate', function(done) {
			contract1.startDate = 'last year';
			return contract1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with an invalid endDate', function(done) {
			contract1.endDate = 'uh, tomorrow?';
			return contract1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save inappropriate PI', function(done) {
			contract1.PI = 'what';
			return contract1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
	});
	afterEach(function(done) {
        Contracts.remove().exec();
        done();
    });
});
