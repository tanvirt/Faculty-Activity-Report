'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');

var request = require('supertest');

var	assignedActivity = require('../../controllers/assignedActivity/assignedActivity');

var mongoose = require('mongoose');
var AssignedActivity = mongoose.model('AssignedActivity');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, aa;

describe('AssignedActivity Controller Tests', function() {
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

		aa = new AssignedActivity({
			year: '2000',

			springTeaching: 20,
			springService: 20,
			springResearch: 60,

			fallTeaching: 20,
			fallService: 20,
			fallResearch: 60,

			summerTeaching: 20,
			summerService: 20,
			summerResearch: 60,

			report: report,
			user: user
		});

		aa.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a assignedActivity if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/assignedActivity')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get an assignedActivity associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/assignedActivity')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

						  	res.body.should.be.an.Object.and.have.property('year', aa.year);

						  	res.body.should.have.property('springTeaching', aa.springTeaching);
						  	res.body.should.have.property('springService', aa.springService);
						  	res.body.should.have.property('springResearch', aa.springResearch);

						  	res.body.should.have.property('fallTeaching', aa.fallTeaching);
						  	res.body.should.have.property('fallService', aa.fallService);
						  	res.body.should.have.property('fallResearch', aa.fallResearch);

						  	res.body.should.have.property('summerTeaching', aa.summerTeaching);
						  	res.body.should.have.property('summerService', aa.summerService);
						  	res.body.should.have.property('summerResearch', aa.summerResearch);

						  	res.body.should.have.property('_id', aa.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific assignedActivity if not logged in', function(done) {
			request(app)
			  .get('/assignedActivity/' + aa.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific assignedActivity based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/assignedActivity/' + aa.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('year', aa.year);

					  	res.body.should.have.property('springTeaching', aa.springTeaching);
					  	res.body.should.have.property('springService', aa.springService);
					  	res.body.should.have.property('springResearch', aa.springResearch);

					  	res.body.should.have.property('fallTeaching', aa.fallTeaching);
					  	res.body.should.have.property('fallService', aa.fallService);
					  	res.body.should.have.property('fallResearch', aa.fallResearch);

					  	res.body.should.have.property('summerTeaching', aa.summerTeaching);
					  	res.body.should.have.property('summerService', aa.summerService);
					  	res.body.should.have.property('summerResearch', aa.summerResearch);

					  	res.body.should.have.property('_id', aa.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});
	});

	describe('Testing the POST methods', function() {

		var aaObj = {
			assignedActivity: {
				year: '2000',

				springTeaching: 20,
				springService: 20,
				springResearch: 60,

				fallTeaching: 20,
				fallService: 20,
				fallResearch: 60,

				summerTeaching: 20,
				summerService: 20,
				summerResearch: 60
			}
		};

		it('should fail to be able to create an assignedActivity if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/assignedActivity')
			  .set('Accept', 'application/json')
			  .send(aaObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new assignedActivity', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/assignedActivity')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(aaObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('year', aaObj.assignedActivity.year);

					  	res.body.should.have.property('springTeaching', aaObj.assignedActivity.springTeaching);
					  	res.body.should.have.property('springService', aaObj.assignedActivity.springService);
					  	res.body.should.have.property('springResearch', aaObj.assignedActivity.springResearch);

					  	res.body.should.have.property('fallTeaching', aaObj.assignedActivity.fallTeaching);
					  	res.body.should.have.property('fallService', aaObj.assignedActivity.fallService);
					  	res.body.should.have.property('fallResearch', aaObj.assignedActivity.fallResearch);

					  	res.body.should.have.property('summerTeaching', aaObj.assignedActivity.summerTeaching);
					  	res.body.should.have.property('summerService', aaObj.assignedActivity.summerService);
					  	res.body.should.have.property('summerResearch', aaObj.assignedActivity.summerResearch);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});
	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific assignedActivity if not logged in', function(done) {
			request(app)
			  .put('/assignedActivity/' + aa.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific assignedActivity', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/assignedActivity/' + aa.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		assignedActivity: {
				  			fallResearch: 20,
				  			fallService: 40,
				  			fallTeaching: 40
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('year', aa.year);

					  	res.body.should.have.property('springTeaching', aa.springTeaching);
					  	res.body.should.have.property('springService', aa.springService);
					  	res.body.should.have.property('springResearch', aa.springResearch);

					  	res.body.should.have.property('fallTeaching', 40);
					  	res.body.should.have.property('fallService', 40);
					  	res.body.should.have.property('fallResearch', 20);

					  	res.body.should.have.property('summerTeaching', aa.summerTeaching);
					  	res.body.should.have.property('summerService', aa.summerService);
					  	res.body.should.have.property('summerResearch', aa.summerResearch);

					  	res.body.should.have.property('_id', aa.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});	
	    
	});

	afterEach(function(done) {
		AssignedActivity.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
