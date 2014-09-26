'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Courses = mongoose.model('Courses');

/**
 * Globals
 */
var course;

describe('Teaching/Advising Courses Model Unit Tests:', function() {
	beforeEach(function(done) {
		course = new Courses({
			name: 'CEN3031: Intro to Software Engineering',
			description: 'Introduction to software engineering...'
			evaluationNumber: 4.84
		});

		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problem', function(done) {
			course.save();
			done();
		});

		it('should fail to save an evaluation number that is greater than 5', function(done) {
			course.evaluationNumber = 6;
			return course.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save an evaluation number that is less than 0', function(done) {
			course.evaluationNumber = -2;
			return course.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save without course name', function(done) {
			course.name = '';

			return course.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save without course description', function(done) {
			course.description = '';

			return course.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save without course evaluation number', function(done) {
			course.evaluationNumber = '';

			return course.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) {
		Courses.remove().exec();
		done();
	});
});
