'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	Governance = mongoose.model('Governance');

var gov1;
	
describe('Governance Model Unit Tests:', function() {
	beforeEach(function(done) {
		gov1 = new Governance({
			//info: 'this is a random string of stuff'
		});
				
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems', function(done) {
			gov1.save();
			done();
		});
		
		it('should set info to N/A if nothing given', function(done) {
			assert.equal(gov1.info, 'N/A');
			done();
		});
		
		/*
		it('should fail to save without subsection', function(done) {
			gov1.subsection = '';
			return gov1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
		it('should fail to save without committee', function(done) {
			gov1.committee = '';
			return gov1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with invalid subsection', function(done) {
			gov1.subsection = 'COOL CLUBS IM IN';
			return gov1.save(function(err) {
				should.exist(err);
				done();
			});
		});*/
	});
	afterEach(function(done) {
        Governance.remove().exec();
        done();
    });
});
