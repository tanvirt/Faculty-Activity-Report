'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Contribution = mongoose.model('Contribution');

/**
 * Globals
 */
var contribution;

describe('Contribution Model Unit Tests:', function() {
	beforeEach(function(done) {
		contribution = new Contribution({
			info: 'I made the following contributions...'
			/*intro: 'Summary of my contributions',
			examples: [{
				title: 'Contribution number 1',
				body: 'I did stuff'
			},
			{
				title: 'Contribution number 2',
				body: 'I did more stuff'
			}],
			conclusion: 'And thats what I did',
			works: [{
				title: 'Work number 1',
				citations: 50
			},
			{
				title: 'Work number 2',
				citations: 100
			}],
			totalCitations: 500,
			h_index: 14,
			i_index: 21,
			website: 'www.google.com'*/
		});

		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problem', function(done) {
			contribution.save();
			done();
		});

		/*it('should fail to save without intro', function(done) {
			contribution.intro = '';

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without example body', function(done) {
			contribution.examples[0].body = '';

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without works title', function(done) {
			contribution.works[0].title = '';

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without works citations', function(done) {
			contribution.works[0].citations = null;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without total citations', function(done) {
			contribution.totalCitations = null;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without h-index', function(done) {
			contribution.h_index = null;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save without i-index', function(done) {
			contribution.i_index = null;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save an invalid website', function(done) {
			contribution.website = 'not a real webiste';

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if works citation is negative number', function(done) {
			contribution.works[0].citations = -5;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if total citations is negative number', function(done) {
			contribution.totalCitations = -3;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if h-index is negative number', function(done) {
			contribution.h_index = -7;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if i-index is negative number', function(done) {
			contribution.i_index = -17;

			return contribution.save(function(err) {
				should.exist(err);
				done();
			});
		});*/
	});

	afterEach(function(done) {
		Contribution.remove().exec();
		done();
	});
});
