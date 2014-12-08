'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	serviceToSchools = require('../../controllers/serviceToSchools/serviceToSchools');

var mongoose = require('mongoose');
var ServiceToSchools = mongoose.model('ServiceToSchools');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, schools;

describe('ServiceToSchools Controller Tests', function() {
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

		schools = new ServiceToSchools({
			info: 'I did stuff',

			report: report,
			user: user
		});

		schools.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a ServiceToSchools if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/serviceToSchools')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a ServiceToSchools associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/serviceToSchools')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('info', schools.info);						

							res.body.should.have.property('_id', schools.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);
						  	done();
						});
				});
		});

		it('should fail to get a specific ServiceToSchools if not logged in', function(done) {
			request(app)
			  .get('/serviceToSchools/' + schools.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific ServiceToSchools based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/serviceToSchools/' + schools.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', schools.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var schoolsObj = {
			serviceToSchools: {
			    info:'I did so much stuff'
		 	}
		};

		it('should fail to create a ServiceToSchools if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/serviceToSchools')
			  .set('Accept', 'application/json')
			  .send(schoolsObj)
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new ServiceToSchools', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/serviceToSchools')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(schoolsObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', schoolsObj.serviceToSchools.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific ServiceToSchools if not logged in', function(done) {
			request(app)
			  .put('/serviceToSchools/' + schools.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific ServiceToSchools', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/serviceToSchools/' + schools.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		serviceToSchools: {
				  			info: 'doing other stuff'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'doing other stuff');

					  	res.body.should.have.property('_id', schools.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		ServiceToSchools.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
