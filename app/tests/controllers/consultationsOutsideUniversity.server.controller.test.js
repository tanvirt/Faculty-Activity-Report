'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	consultationsOutsideUniversity = require('../../controllers/consultationsOutsideUniversity/consultationsOutsideUniversity');

var mongoose = require('mongoose');
var ConsultationsOutsideUniversity = mongoose.model('ConsultationsOutsideUniversity');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, user2, c1, c2, report;

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

		c1 = new ConsultationsOutsideUniversity({
			info: 'I went to stuff at different place',

			report: report,
			user: user
		});

		c2 = new ConsultationsOutsideUniversity({
			info: 'I did other stuff at different places',

			report: report,
			user: user2
		});

		c1.save();
		c2.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/consultationsOutsideUniversity')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get consultationsOutsideUniversity associated with its report id', function(done) {
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
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body[0].should.have.property('_id', c1.id);
							res.body[0].should.have.property('info', c1.info);
						  	res.body[0].user.should.have.property('_id', user.id);
						  	res.body[0].report.should.have.property('_id', report.id);
						  	done();
						});
				});
		});

		it('should fail to be able to get a specific consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .get('/consultationsOutsideUniversity/' + c1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to get a specific consultationsOutsideUniversity if the user does not own the consultationsOutsideUniversity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/consultationsOutsideUniversity/' + c2.id)
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

		it('should be able to get a specific consultationsOutsideUniversity if the user does own the consultationsOutsideUniversity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/consultationsOutsideUniversity/' + c1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', c1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific consultationsOutsideUniversity if the user does not own the consultationsOutsideUniversity and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/consultationsOutsideUniversity/' + c1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', c1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific consultationsOutsideUniversity if the user does own the consultationsOutsideUniversity is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/consultationsOutsideUniversity/' + c2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', c2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});  

	});

	describe('Testing the POST methods', function() {

		var consultationsOutsideUniversityObj = {
			consultationsOutsideUniversity: {
			    info:'Going places'
		 	}
		};

		it('should fail to be able to create a consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/consultationsOutsideUniversity')
			  .set('Accept', 'application/json')
			  .send(consultationsOutsideUniversityObj)
			  
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
					  .send(consultationsOutsideUniversityObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('info', consultationsOutsideUniversityObj.consultationsOutsideUniversity.info);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific consultationsOutsideUniversity if not logged in', function(done) {
			request(app)
			  .put('/consultationsOutsideUniversity/' + c1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to update a specific consultationsOutsideUniversity if the user does not own the consultationsOutsideUniversity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/consultationsOutsideUniversity/' + c2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		consultationsOutsideUniversity: {
				  			info:'Different places'
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

		it('should be able to update a specific consultationsOutsideUniversity if the user does own the consultationsOutsideUniversity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/consultationsOutsideUniversity/' + c1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		consultationsOutsideUniversity: {
				  			info:'Different places'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different places');

					  	res.body.should.have.property('_id', c1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific consultationsOutsideUniversity if the user does not own the consultationsOutsideUniversity and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/consultationsOutsideUniversity/' + c1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		consultationsOutsideUniversity: {
				  			info:'Different places'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different places');

					  	res.body.should.have.property('_id', c1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific consultationsOutsideUniversity if the user does own the consultationsOutsideUniversity is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/consultationsOutsideUniversity/' + c2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		consultationsOutsideUniversity: {
				  			info:'Different places'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('info', 'Different places');

					  	res.body.should.have.property('_id', c2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

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
