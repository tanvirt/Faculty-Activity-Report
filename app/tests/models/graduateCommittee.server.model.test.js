'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	GraduateCommittee = mongoose.model('GraduateCommittee');

/**
 * Globals
 */

var committee01, committee02;

describe('Graduate Committee Model Unit Tests:', function() {
	beforeEach(function(done) {
	
		committee01 = new GraduateCommittee({
			sub: [{
				role: 'Chair',
				studentName: 'studentTestName',
				degree: 'M.S.',
				major: 'Computer Science',
				degreeDate: '10/10/1990'
			},
			{
				role: 'Chair',
				studentName: 'studentTestName',
				degree: 'M.S.',
				major: 'Computer Science',
				degreeDate: '10/10/1990'
			}]
		});

		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problem', function(done) {
			committee01.save();
			done();
		});
		
		it('should not fail to save an existing activity again', function(done) {
			committee01.save();
			done();
		});

		it('should fail to save a date that is beyond the present year', function(done) {
			committee01.sub[0].degreeDate.setFullYear(Date.getFullYear + 10);
			return committee01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save a year that is below 1980', function(done) {
			committee01.sub[0].degreeDate.setFullYear(1800);
			return committee01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if degree is not valid', function(done) {
			committee01.sub[0].degree = 'AAA';
			return committee01.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		GraduateCommittee.remove().exec();
		done();
	});
});
