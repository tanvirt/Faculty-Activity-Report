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

var user, user2, e1, e2, report;

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

		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'admin',
			password: 'password',
			provider: 'local',
			roles: ['admin']
		});

		user2.save();

		report = new Report({
			reportName: 'MyReportName',
			user: user
		});

		report.save();

		e1 = new EditorServiceReviewer({
			info: 'I edited stuff',

			report: report,
			user: user
		});

		e2 = new EditorServiceReviewer({
			info: 'I edited other stuff',

			report: report,
			user: user2
		});

		e1.save();
		e2.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get an editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/editorServiceReviewer')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get editorServiceReviewer associated with its report id', function(done) {
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

							res.body.should.have.property('_id', e1.id);
							res.body.should.have.property('info', e1.info);
						  	res.body.user.should.have.property('_id', user.id);
						  	res.body.report.should.have.property('_id', report.id);
						  	done();
						});
				});
		});

		it('should fail to be able to get a specific editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .get('/editorServiceReviewer/' + e1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to get a specific editorServiceReviewer if the user does not own the editorServiceReviewer and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/editorServiceReviewer/' + e2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(403)
				  	.end(function(err, res) {
				  		should.not.exist(err);

				  		res.body.should.have.property('message').and.equal('User is not authorized');

				  		done();
				  	});

				});
		});    

		it('should be able to get a specific editorServiceReviewer if the user does own the editorServiceReviewer and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/editorServiceReviewer/' + e1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', e1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific editorServiceReviewer if the user does not own the editorServiceReviewer and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/editorServiceReviewer/' + e1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', e1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific editorServiceReviewer if the user does own the editorServiceReviewer is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/editorServiceReviewer/' + e2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', e2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});  

	});

	describe('Testing the POST methods', function() {

		var editorServiceReviewerObj = {
			editorServiceReviewer: {
			    info:'Editing things'
		 	}
		};

		it('should fail to be able to create an editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/editorServiceReviewer')
			  .set('Accept', 'application/json')
			  .send(editorServiceReviewerObj)
			  
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
					  .send(editorServiceReviewerObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', editorServiceReviewerObj.editorServiceReviewer.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific editorServiceReviewer if not logged in', function(done) {
			request(app)
			  .put('/editorServiceReviewer/' + e1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to update a specific editorServiceReviewer if the user does not own the editorServiceReviewer and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/editorServiceReviewer/' + e2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		editorServiceReviewer: {
				  			info:'Different stuff'
				  		}
				  	})
				  	
				  	.expect(403)
				  	.end(function(err, res) {
				  		should.not.exist(err);

				  		res.body.should.have.property('message').and.equal('User is not authorized');

				  		done();
				  	});

				});
		});    

		it('should be able to update a specific editorServiceReviewer if the user does own the editorServiceReviewer and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/editorServiceReviewer/' + e1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		editorServiceReviewer: {
				  			info:'Different stuff'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different stuff');

					  	res.body.should.have.property('_id', e1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific editorServiceReviewer if the user does not own the editorServiceReviewer and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/editorServiceReviewer/' + e1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		editorServiceReviewer: {
				  			info:'Different stuff'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different stuff');

					  	res.body.should.have.property('_id', e1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific editorServiceReviewer if the user does own the editorServiceReviewer is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/editorServiceReviewer/' + e2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		editorServiceReviewer: {
				  			info:'Different stuff'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different stuff');

					  	res.body.should.have.property('_id', e2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

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