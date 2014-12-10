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

var user, user2, g1, g2, report;

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

		g1 = new Governance({
			info: 'I did stuff',

			report: report,
			user: user
		});

		g2 = new Governance({
			info: 'I did other stuff too',

			report: report,
			user: user2
		});

		g1.save();
		g2.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a governance if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/governance')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get governance associated with its report id', function(done) {
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
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.have.property('_id', g1.id);
							res.body.should.have.property('info', g1.info);
						  	res.body.user.should.have.property('_id', user.id);
						  	res.body.report.should.have.property('_id', report.id);
						  	done();
						});
				});
		});

		it('should fail to be able to get a specific governance if not logged in', function(done) {
			request(app)
			  .get('/governance/' + g1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to get a specific governance if the user does not own the governance and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/governance/' + g2.id)
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

		it('should be able to get a specific governance if the user does own the governance and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/governance/' + g1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', g1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific governance if the user does not own the governance and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/governance/' + g1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', g1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific governance if the user does own the governance is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/governance/' + g2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', g2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});  

	});

	describe('Testing the POST methods', function() {

		var governanceObj = {
			governance: {
			    info:'Doing things'
		 	}
		};

		it('should fail to be able to create a governance if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/governance')
			  .set('Accept', 'application/json')
			  .send(governanceObj)
			  
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
					  .send(governanceObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', governanceObj.governance.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific governance if not logged in', function(done) {
			request(app)
			  .put('/governance/' + g1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to update a specific governance if the user does not own the governance and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/governance/' + g2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		governance: {
				  			info:'Different things'
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

		it('should be able to update a specific governance if the user does own the governance and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/governance/' + g1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		governance: {
				  			info:'Different things'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different things');

					  	res.body.should.have.property('_id', g1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific governance if the user does not own the governance and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/governance/' + g1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		governance: {
				  			info:'Different things'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different things');

					  	res.body.should.have.property('_id', g1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific governance if the user does own the governance is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/governance/' + g2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		governance: {
				  			info:'Different things'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different things');

					  	res.body.should.have.property('_id', g2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

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