'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	editorServiceReviewer = require('../../controllers/editorServiceReviewer/editorServiceReviewer');

var mongoose = require('mongoose');
var EditorServiceReviewer = mongoose.model('EditorServiceReviewer');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, esr;

describe('EditorServiceReviewer Controller Tests', function() {
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

		esr = new EditorServiceReviewer({
			info: 'editing and servicing and reviewing',

			report: report,
			user: user
		});

		esr.save();
		
		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to get a editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/editorServiceReviewer')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a editorServiceReviewer associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/editorServiceReviewer')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('info', esr.info);						

							res.body.should.have.property('_id', esr.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);
						  	done();
						});
				});
		});

		it('should fail to get a specific editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .get('/editorServiceReviewer/' + esr.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific editorServiceReviewer based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/editorServiceReviewer/' + esr.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object;

					  	res.body.should.have.property('_id', esr.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var esrObj = {
			editorServiceReviewer: {
			    info:'new editing stuff'
		 	}
		};

		it('should fail to create a editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/editorServiceReviewer')
			  .set('Accept', 'application/json')
			  .send(esrObj)
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new editorServiceReviewer', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/editorServiceReviewer')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(esrObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', esrObj.editorServiceReviewer.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to update a specific editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .put('/editorServiceReviewer/' + esr.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific editorServiceReviewer', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/editorServiceReviewer/' + esr.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		editorServiceReviewer: {
				  			info: 'editing other stuff'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'editing other stuff');

					  	res.body.should.have.property('_id', esr.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		EditorServiceReviewer.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});