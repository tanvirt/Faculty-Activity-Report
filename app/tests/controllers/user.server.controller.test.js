'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');

var request = require('super-request');

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

describe('User Tests', function() {

	beforeEach(function(done) {
		done();
	});

	describe('Signup', function() {
		it('should be able to signup', function(done) {
			request(app)			
				.post('/auth/signup')
				.json({
					firstName: 'Bob',
					lastName: 'Jones',
					email: 'bj@ufl.edu',
					username: 'MyUserName',
					password: 'MyPassword'
				})
				.expect(200)
				
				.end(done);
		});
	});

	describe('Login', function() {
		it('should not be able to log in to a nonexisting account', function(done) {
			request(app)
				.post('/auth/signin')
				.json({
					username: 'MyUserName',
					password: 'MyPassword'
				})
				.expect(400)
				
				.end(done);
		});

		it('should be able to login into an existing account', function(done) {
			request(app)

			.post('/auth/signup')
			.json({
				firstName: 'Bob',
				lastName: 'Jones',
				email: 'bj@ufl.edu',
				username: 'MyUserName',
				password: 'MyPassword'
			})
			.expect(200)
			
			.end()

			.get('/auth/signout')
			.expect(200)
			.end()

			.post('/auth/signin')
			.json({
				username: 'MyUserName',
				password: 'MyPassword'
			})
			.expect(200)
			
			.end(done);
		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});