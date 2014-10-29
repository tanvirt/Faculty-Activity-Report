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
			//info: 'I am a member of these things in the profession: '
			/*examples: [{
				title: 'International Conference on Data Engineering',
				year: 2014
			},
			{
				title: 'ACM-SIGMOD',
				year: 2013
			}]*/
		});
		done();
	});

	describe('Method Save', function() {

		it('should be able to save without problems', function(done) {
			membership.save();
			done();
		});

		it('should set info to N/A if nothing given', function(done) {
			assert.equal(membership.info, 'N/A');
			done();
		});

		/*it('should fail to save with a future date', function(done) {
			membership.examples[0].year = 2020;

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save with a date prior to 1900', function(done) {
			membership.examples[0].year = 1865;

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without example title', function(done) {
			membership.examples[0].title = '';

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without example year', function(done) {
			membership.examples[0].year = null;

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});*/

	});

	afterEach(function(done) {
		Membership.remove().exec();
		done();
	});
});