'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	teachingAdvising = require('../../controllers/teachingAdvising/teachingAdvising');

var mongoose = require('mongoose');
var TeachingAdvising = mongoose.model('TeachingAdvising');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, user2, advising, advising2, report;

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

		advising = new TeachingAdvising({
			info: 'I taught some courses and advised some people',

			report: report,
			user: user
		});

		advising2 = new TeachingAdvising({
			info: 'I did stuff',

			report: report,
			user: user2
		});

		advising.save();
		advising2.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a teachingAdvising if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/teachingAdvising')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get teachingAdvising associated with its report id', function(done) {
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
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.have.property('_id', advising.id);
							res.body.should.have.property('info', advising.info);
						  	res.body.user.should.have.property('_id', user.id);
						  	res.body.report.should.have.property('_id', report.id);
						  	done();
						});
				});
		});

		it('should fail to be able to get a specific teachingAdvising if not logged in', function(done) {
			request(app)
			  .get('/teachingAdvising/' + advising.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to get a specific teachingAdvising if the user does not own the teachingAdvising and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/teachingAdvising/' + advising2.id)
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

		it('should be able to get a specific teachingAdvising if the user does own the teachingAdvising and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/teachingAdvising/' + advising.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', advising.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific teachingAdvising if the user does not own the teachingAdvising and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/teachingAdvising/' + advising.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', advising.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific teachingAdvising if the user does own the teachingAdvising is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/teachingAdvising/' + advising2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', advising2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});  

	});

	describe('Testing the POST methods', function() {

		var advisingObj = {
			teachingAdvising: {
			    info:'Advising people'
		 	}
		};

		it('should fail to be able to create a teachingAdvising if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/teachingAdvising')
			  .set('Accept', 'application/json')
			  .send(advisingObj)
			  
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
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', advisingObj.teachingAdvising.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific teachingAdvising if not logged in', function(done) {
			request(app)
			  .put('/teachingAdvising/' + advising.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to update a specific teachingAdvising if the user does not own the teachingAdvising and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/teachingAdvising/' + advising2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		teachingAdvising: {
				  			info:'Different advising'
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

		it('should be able to update a specific teachingAdvising if the user does own the teachingAdvising and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/teachingAdvising/' + advising.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		teachingAdvising: {
				  			info:'Different advising'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different advising');

					  	res.body.should.have.property('_id', advising.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific teachingAdvising if the user does not own the teachingAdvising and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/teachingAdvising/' + advising.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		teachingAdvising: {
				  			info:'Different info'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different info');

					  	res.body.should.have.property('_id', advising.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific teachingAdvising if the user does own the teachingAdvising is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/teachingAdvising/' + advising2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		teachingAdvising: {
				  			info:'Different info'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different info');

					  	res.body.should.have.property('_id', advising2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

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