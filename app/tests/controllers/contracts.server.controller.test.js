'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	contracts = require('../../controllers/contracts/contracts');

var mongoose = require('mongoose');
var Contracts = mongoose.model('Contracts');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, c1, c2, c3;

describe('Contracts Controller Tests', function() {
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

		c1 = new Contracts({
			title: 'MyTitle',
			funded: 'externally',
			PI: 'PI',
			startDate: 'October 1993',
			endDate: 'December 2000',
			fundingAgency: 'This is the funding agency',
			fundingPortion: 100,
			value: 200,

			report: report,
			user: user
		});

		c2 = new Contracts({
			title: 'MyTitle2',
			funded: 'externally',
			PI: 'PI',
			startDate: 'October 1993',
			endDate: 'December 2000',
			fundingAgency: 'This is the funding agency',
			fundingPortion: 100,
			value: 200,

			report: report,
			user: user
		});

		c3 = new Contracts({
			title: 'MyTitle3',
			funded: 'externally',
			PI: 'PI',
			startDate: 'October 1993',
			endDate: 'December 2000',
			fundingAgency: 'This is the funding agency',
			fundingPortion: 100,
			value: 200,

			report: report,
			user: user
		});

		c1.save();
		c2.save();
		c3.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a contract if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/contracts')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a contract associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/contracts')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Array;
							res.body.should.have.length(3);

							res.body[0].should.be.an.Object;	
							res.body[1].should.be.an.Object;	
							res.body[2].should.be.an.Object;							

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific contracts if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/contracts/' + c1.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific contracts based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/reports/' + report.id + '/contracts/' + c1.id)
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

		var cObj = {
			contracts: {
			    title: 'MyTitle3',
				funded: 'externally',
				PI: 'PI',
				startDate: 'October 1993',
				endDate: 'December 2000',
				fundingAgency: 'This is the funding agency',
				fundingPortion: 100,
				value: 200
		 	}
		};

		it('should fail to be able to create an contracts if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/contracts')
			  .set('Accept', 'application/json')
			  .send(cObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new contracts', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/contracts')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(cObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('title', cObj.contracts.title);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});


	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific contracts if not logged in', function(done) {
			request(app)
			  .put('/reports/' + report.id + '/contracts/' + c1.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific contracts', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/reports/' + report.id + '/contracts/' + c1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		contracts: {
				  			title:'Different Title'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('title', 'Different Title');

					  	res.body.should.have.property('_id', c1.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
	    
	});

	afterEach(function(done) {
		Contracts.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
