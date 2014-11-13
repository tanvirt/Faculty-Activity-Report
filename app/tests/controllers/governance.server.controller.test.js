'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	governance = require('../../controllers/governance/governance');

var mongoose = require('mongoose');
var Governance = mongoose.model('Governance');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, gov;

describe('Governance Controller Tests', function() {
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

		gov = new Governance({
			govStr: 'editing and servicing and reviewing',

			report: report,
			user: user
		});

		gov.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a governance if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/governance')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a governance associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/governance')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('govStr', gov.govStr);						

							res.body.should.have.property('_id', gov.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);
						  	done();
						});
				});
		});

		it('should fail to get a specific governance if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/governance/' + gov.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific governance based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/reports/' + report.id + '/governance/' + gov.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', gov.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var govObj = {
			governance: {
			    govStr:'new editing stuff'
		 	}
		};

		it('should fail to create a governance if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/governance')
			  .set('Accept', 'application/json')
			  .send(govObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new governance', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/governance')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(govObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('govStr', govObj.governance.govStr);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific governance if not logged in', function(done) {
			request(app)
			  .put('/reports/' + report.id + '/governance/' + gov.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific governance', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/reports/' + report.id + '/governance/' + gov.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		governance: {
				  			govStr: 'editing other stuff'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('govStr', 'editing other stuff');

					  	res.body.should.have.property('_id', gov.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		Governance.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});