'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	assert = require('assert'),
	User = mongoose.model('User'),
	Report = mongoose.model('Report');

/**
 * Globals
 */
var user, report;

/**
 * Unit tests
 */
describe('Report Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			report = new Report({
				//reportName: 'Report Name',
				user: user
				//name.firstName: 'first',
				//name.middleName: 'M',
				//name.lastName: 'last',
				//currentRank.rank: 'professor',
				//dateAppointed.theDate: 'October 2012',
				//affiliateAppointments.app: 'Affiliate Appointments',
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems without given report name', function(done) {
			report.save();
			done();
		});

		it('should set report name to MyReportName if nothing given', function(done) {
			assert.equal(report.reportName, 'MyReportName');
			done();
		});
		
		it('should save without problems with a report name', function(done) {
			report.reportName = 'this is a reportname 8829 @!';
			report.save(done);
		});
	});

	afterEach(function(done) { 
		Report.remove().exec();
		User.remove().exec();

		done();
	});
});