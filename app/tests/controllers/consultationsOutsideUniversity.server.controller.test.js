'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	consultations = require('../../controllers/consultationsOutsideUniversity/consultationsOutsideUniversity');

var mongoose = require('mongoose');
var ConsultationsOutsideUniversity = mongoose.model('ConsultationsOutsideUniversity');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, consult;

describe('ConsultationsOutsideUniversity Controller Tests', function() {
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

		consult = new ConsultationsOutsideUniversity({
			info: 'I did stuff',

			report: report,
			user: user
		});

		consult.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/consultationsOutsideUniversity')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a consultationsOutsideUniversity associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/consultationsOutsideUniversity')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('info', consult.info);						

							res.body.should.have.property('_id', consult.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);
						  	done();
						});
				});
		});

		it('should fail to get a specific consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .get('/consultationsOutsideUniversity/' + consult.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific consultationsOutsideUniversity based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/consultationsOutsideUniversity/' + consult.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', consult.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var consultationObj = {
			consultationsOutsideUniversity: {
			    info:'I did so much stuff'
		 	}
		};

		it('should fail to create a consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/consultationsOutsideUniversity')
			  .set('Accept', 'application/json')
			  .send(consultationObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new consultationsOutsideUniversity', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/consultationsOutsideUniversity')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(consultationObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', consultationObj.consultationsOutsideUniversity.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .put('/consultationsOutsideUniversity/' + consult.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific consultationsOutsideUniversity', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/consultationsOutsideUniversity/' + consult.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		consultationsOutsideUniversity: {
				  			info: 'doing other stuff'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'doing other stuff');

					  	res.body.should.have.property('_id', consult.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		ConsultationsOutsideUniversity.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
