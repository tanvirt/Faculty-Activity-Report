'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	AssignedActivity = mongoose.model('AssignedActivity');

/**
 * Globals
 */
var activity01, activity02;

describe('Assigned Activity Model Unit Tests:', function() {
	beforeEach(function(done) {
		activity01 = new AssignedActivity({
			year: '2014',
			semester: 'spring',
			teaching: 33,
			research: 33,
			service: 34
		});

		activity02 = new AssignedActivity({
			year: '2014',
			semester: 'spring',
			teaching: 33,
			research: 33,
			service: 34
		});

		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problem', function(done) {
			activity01.save();
			done();
		});

		it('should fail to save a year that is beyond the present year', function(done) {
			activity01.year = 2015;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save a year that is below 1980', function(done) {
			activity01.year = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not fail to save a semester that is not spring, fall, summer', function(done) {
			activity01.semester = 'fall';
			activity01.save();
			done();
		});

		it('should fail to save a semester that is not spring, fall, summer', function(done) {
			activity01.semester = 'winter';
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if teaching that is a negative number', function(done) {
			activity01.teaching = -50;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if research that is a negative number', function(done) {
			activity01.research = -50;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if service that is a negative number', function(done) {
			activity01.service = -50;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if teaching, research and service don\'t add up to 100', function(done) {
			activity01.teaching = 10;
			activity01.service = 20;
			activity01.research = 5;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		AssignedActivity.remove().exec();
		done();
	});
});
