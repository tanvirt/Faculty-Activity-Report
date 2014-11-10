'use strict';

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	creativeWorks = require('../../controllers/teachingAdvising/teachingAdvising');

var mongoose = require('mongoose');
var TeachingAdvising = mongoose.model('TeachingAdvising');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, advising;

function removeIds(id) {
	delete id._id;
	delete id.report;
	delete id.user;

	return id;
}

describe('TeachingAdvising Controller Tests', function() {
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

		advising = new TeachingAdvising({
			info: 'I am teaching some courses and advising some people',

			report: report,
			user: user
		});

		advising.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a teachingAdvising if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/teachingAdvising')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a teachingAdvising associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/teachingAdvising')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object;						

						  	done();
						});
				});
		});

		it('should fail to get a specific teachingAdvising if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/teachingAdvising/' + advising.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific teachingAdvising based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/reports/' + report.id + '/teachingAdvising/' + advising.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', advising.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var advisingObj = {
			teachingAdvising: {
			    advising:'teaching stuff'
		 	}
		};

		it('should fail to create a teachingAdvising if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/teachingAdvising')
			  .set('Accept', 'application/json')
			  .send(advisingObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new teachingAdvising', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/teachingAdvising')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(advisingObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', advisingObj.teachingAdvising.advising);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific teachingAdvising if not logged in', function(done) {
			request(app)
			  .put('/reports/' + report.id + '/teachingAdvising/' + advising.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific teachingAdvising', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/reports/' + report.id + '/teachingAdvising/' + advising.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		advising: 'teaching other stuff'
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'teaching other stuff');

					  	res.body.should.have.property('_id', advising.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		TeachingAdvising.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
