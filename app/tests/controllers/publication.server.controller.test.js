'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	publication = require('../../controllers/publication/publication');

var mongoose = require('mongoose');
var Publication = mongoose.model('Publication');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, pub;

describe('Publication Controller Tests', function() {
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

		pub = new Publication({
			info: 'I published stuff',

			report: report,
			user: user
		});

		pub.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a publication if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/publication')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a publication associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/publication')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('info', pub.info);						

							res.body.should.have.property('_id', pub.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);
						  	done();
						});
				});
		});

		it('should fail to get a specific publication if not logged in', function(done) {
			request(app)
			  .get('/publication/' + pub.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific publication based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/publication/' + pub.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', pub.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var publicationObj = {
			publication: {
			    info:'I wrote other stuff'
		 	}
		};

		it('should fail to create a publication if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/publication')
			  .set('Accept', 'application/json')
			  .send(publicationObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new publication', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/publication')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(publicationObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', publicationObj.publication.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific publication if not logged in', function(done) {
			request(app)
			  .put('/publication/' + pub.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific publication', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/publication/' + pub.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		publication: {
				  			info: 'writing stuff'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'writing stuff');

					  	res.body.should.have.property('_id', pub.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		Publication.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
