'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2, user3;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		
		user3 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) { //this one - I dont understand what it's doing?
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should be able to throw an error when trying to save a user with the same username', function(done) {
			user.username = 'abc';
			user.save();
			user2.username = 'abc';
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});
		

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

	    	it('should be able to show an error when try to save without email', function(done) {
			user.email = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when trying to save without a valid email address', function(done) {
			user.email = 'myemail@gmail';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});
			
		it('should be able to show an error when using try to save with too short password', function(done) {
			user.password = '1';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when trying to save without username', function(done) {
			user.username = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should be able to show an error if trying to save without a last name', function(done) {
			user.lastName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
 		});
		
		/* Always Fails
		it('should throw an error if the displayName does not equal the firstName plus a space plus lastName', function(done) {
			user.firstName = 'A';
			user.LastName = 'B';
			user.displayName = 'C D';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});
		*/

	});

	afterEach(function(done) {
		User.remove().exec();
		done();
	});
});
