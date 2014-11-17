'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	contribution = require('../../controllers/contribution/contribution');

var mongoose = require('mongoose');
var Contribution = mongoose.model('Contribution');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, c1;

describe('Contribution Controller Tests', function() {
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

		c1 = new Contribution({
			info: 'I am contributing lots of stuff',

			report: report,
			user: user
		});

		c1.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a contribution if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/contribution')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a contribution associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/contribution')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('info', c1.info);						

							res.body.should.have.property('_id', c1.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);
						  	done();
						});
				});
		});

		it('should fail to get a specific contribution if not logged in', function(done) {
			request(app)
			  .get('/contribution/' + c1.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific contribution based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/contribution/' + c1.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', c1.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var contributionObj = {
			contribution: {
			    info:'doing stuff'
		 	}
		};

		it('should fail to create a contribution if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/contribution')
			  .set('Accept', 'application/json')
			  .send(contributionObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new contribution', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/contribution')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(contributionObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', contributionObj.contribution.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific contribution if not logged in', function(done) {
			request(app)
			  .put('/contribution/' + c1.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific contribution', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/contribution/' + c1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		contribution: {
				  			info: 'doing other stuff'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'doing other stuff');

					  	res.body.should.have.property('_id', c1.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		Contribution.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
