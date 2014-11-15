'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	Membership = mongoose.model('Membership');

/**
 * Globals
 */

var membership;

describe('Membership Model Unit Tests:', function() {
	beforeEach(function(done) {

		membership = new Membership({

		});
		done();
	});

	describe('Method Save', function() {

		it('should be able to save without problems if no info given', function(done) {
			membership.save();
			done();
		});
		it('should set info to N/A if nothing given', function(done) {
			assert.equal(membership.info, 'N/A');
			done();
		});
		it('should be able to save without problems if info is given', function(done) {
			membership.info = 'I wrote some books';
			membership.save();
			done();
		});

	});

	afterEach(function(done) {
		Membership.remove().exec();
		done();
	});
});