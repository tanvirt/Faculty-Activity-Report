'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	Publication = mongoose.model('Publication');

var pub1;
	
describe('Publication Model Unit Tests:', function() {
	beforeEach(function(done) {
		pub1 = new Publication({

		});
		
		
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems if no info given', function(done) {
			pub1.save();
			done();
		});
		it('should set info to N/A if nothing given', function(done) {
			assert.equal(pub1.info, 'N/A');
			done();
		});
		it('should be able to save without problems if info is given', function(done) {
			pub1.info = 'I wrote some books';
			pub1.save();
			done();
		});
	
	});
	afterEach(function(done) {
        Publication.remove().exec();
        done();
    });
});
