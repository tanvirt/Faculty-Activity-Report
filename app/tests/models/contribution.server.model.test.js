'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	Contribution = mongoose.model('Contribution');

/**
 * Globals
 */
var contribution;

describe('Contribution Model Unit Tests:', function() {
	beforeEach(function(done) {
		contribution = new Contribution({
			//info: 'I made the following contributions...'
		});

		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problem', function(done) {
			contribution.save();
			done();
		});

		it('should set info to N/A if nothing given', function(done) {
			assert.equal(contribution.info, 'N/A');
			done();
		});

	});

	afterEach(function(done) {
		Contribution.remove().exec();
		done();
	});
});
