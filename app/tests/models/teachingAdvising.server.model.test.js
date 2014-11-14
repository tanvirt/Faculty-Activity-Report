'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	TeachingAdvising = mongoose.model('TeachingAdvising');

/**
 * Globals
 */
var advising;

describe('Teaching/Advising Model Unit Tests:', function() {
	beforeEach(function(done) {
		advising = new TeachingAdvising({
			
		});

		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problems if no info given', function(done) {
			advising.save();
			done();
		});
		it('should set info to N/A if nothing given', function(done) {
			assert.equal(advising.info, 'N/A');
			done();
		});
		it('should be able to save without problems if info is given', function(done) {
			advising.info = 'I taught some courses';
			advising.save();
			done();
		});

	});

	afterEach(function(done) {
		TeachingAdvising.remove().exec();
		done();
	});
});
