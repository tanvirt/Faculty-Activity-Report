'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Membership = mongoose.model('Membership');

/**
 * Globals
 */

var membership;

describe('Membership Model Unit Tests:', function() {
	beforeEach(function(done) {

		membership = new Membership({
			programCommittee: [{
				title: 'Internation Conference on Data Engineering',
				year: 2014
			},
			{
				title: 'ACM-SIGMOD',
				year: 2013
			}]
		});
		done();
	});

	describe('Method Save', function() {

		it('should be able to save without problems', function(done) {
			membership.save();
			done();
		});

		it('should fail to save with a future date', function(done) {
			membership.programCommittee[0].year = 2020;

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save with a date prior to 1900', function(done) {
			membership.programCommittee[0].year = 1865;

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without programCommittee title', function(done) {
			membership.programCommittee[0].title = '';

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without programCommittee year', function(done) {
			membership.programCommittee[0].year = null;

			return membership.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) {
		Membership.remove().exec();
		done();
	});
});