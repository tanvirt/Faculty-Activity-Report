'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	membership = require('../../controllers/membership/membership');

var mongoose = require('mongoose');
var Membership = mongoose.model('Membership');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, member;

describe('Membership Controller Tests', function() {
	beforeEach(function(done) {

		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		user.save();

		report = new Report({
			reportName: 'MyReportName',
			user: user
		});

		report.save();

		member = new Membership({
			info: 'I am a member of the following organizations',

			report: report,
			user: user
		});

		member.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a membership if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/membership')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a membership associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/membership')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('info', member.info);						

							res.body.should.have.property('_id', member.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);
						  	done();
						});
				});
		});

		it('should fail to get a specific membership if not logged in', function(done) {
			request(app)
			  .get('/membership/' + member.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific membership based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/membership/' + member.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', member.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var membershipObj = {
			membership: {
			    info:'I joined some other organizations'
		 	}
		};

		it('should fail to create a membership if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/membership')
			  .set('Accept', 'application/json')
			  .send(membershipObj)
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new membership', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/membership')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(membershipObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', membershipObj.membership.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific membership if not logged in', function(done) {
			request(app)
			  .put('/membership/' + member.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific membership', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/membership/' + member.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		membership: {
				  			info: 'joining more organizations'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'joining more organizations');

					  	res.body.should.have.property('_id', member.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		Membership.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
