'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	assignedActivity = require('../../controllers/assignedActivity/assignedActivity');

var mongoose = require('mongoose');
var AssignedActivity = mongoose.model('AssignedActivity');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, user2, aa1, aa2, report;

describe('AssignedActivity Controller Tests', function() {
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

		aa1 = new AssignedActivity({
			year: '2000',

			springTeaching: 20,
			springService: 20,
			springResearch: 60,

			fallTeaching: 20,
			fallService: 20,
			fallResearch: 60,

			summerTeaching: 20,
			summerService: 20,
			summerResearch: 60,

			report: report,
			user: user
		});

		aa2 = new AssignedActivity({
			year: '2001',

			springTeaching: 15,
			springService: 15,
			springResearch: 70,

			fallTeaching: 15,
			fallService: 15,
			fallResearch: 70,

			summerTeaching: 15,
			summerService: 15,
			summerResearch: 70,

			report: report,
			user: user2
		});

		aa1.save();
		aa2.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get an assignedActivity if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/assignedActivity')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get assignedActivity associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/assignedActivity')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Object.and.have.property('year', aa1.year);

						  	res.body.should.have.property('springTeaching', aa1.springTeaching);
						  	res.body.should.have.property('springService', aa1.springService);
						  	res.body.should.have.property('springResearch', aa1.springResearch);

						  	res.body.should.have.property('fallTeaching', aa1.fallTeaching);
						  	res.body.should.have.property('fallService', aa1.fallService);
						  	res.body.should.have.property('fallResearch', aa1.fallResearch);

						  	res.body.should.have.property('summerTeaching', aa1.summerTeaching);
						  	res.body.should.have.property('summerService', aa1.summerService);
						  	res.body.should.have.property('summerResearch', aa1.summerResearch);

						  	res.body.should.have.property('_id', aa1.id);
						  	res.body.user.should.have.property('_id', user.id);
						  	res.body.report.should.have.property('_id', report.id);

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific assignedActivity if not logged in', function(done) {
			request(app)
			  .get('/assignedActivity/' + aa1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to get a specific assignedActivity if the user does not own the assignedActivity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/assignedActivity/' + aa2.id)
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

		it('should be able to get a specific assignedActivity if the user does own the assignedActivity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/assignedActivity/' + aa1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', aa1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific assignedActivity if the user does not own the assignedActivity and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/assignedActivity/' + aa1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', aa1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific assignedActivity if the user does own the assignedActivity is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/assignedActivity/' + aa2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', aa2.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});  

	});

	describe('Testing the POST methods', function() {

		var assignedActivityObj = {
			assignedActivity: {
				year: '2000',

				springTeaching: 20,
				springService: 20,
				springResearch: 60,

				fallTeaching: 20,
				fallService: 20,
				fallResearch: 60,

				summerTeaching: 20,
				summerService: 20,
				summerResearch: 60
		 	}
		};

		it('should fail to be able to create an assignedActivity if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/assignedActivity')
			  .set('Accept', 'application/json')
			  .send(assignedActivityObj)
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new assignedActivity', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/assignedActivity')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(assignedActivityObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('year', assignedActivityObj.assignedActivity.year);

					  	res.body.should.have.property('springTeaching', assignedActivityObj.assignedActivity.springTeaching);
					  	res.body.should.have.property('springService', assignedActivityObj.assignedActivity.springService);
					  	res.body.should.have.property('springResearch', assignedActivityObj.assignedActivity.springResearch);

					  	res.body.should.have.property('fallTeaching', assignedActivityObj.assignedActivity.fallTeaching);
					  	res.body.should.have.property('fallService', assignedActivityObj.assignedActivity.fallService);
					  	res.body.should.have.property('fallResearch', assignedActivityObj.assignedActivity.fallResearch);

					  	res.body.should.have.property('summerTeaching', assignedActivityObj.assignedActivity.summerTeaching);
					  	res.body.should.have.property('summerService', assignedActivityObj.assignedActivity.summerService);
					  	res.body.should.have.property('summerResearch', assignedActivityObj.assignedActivity.summerResearch);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		var assignedActivityObj = {
			assignedActivity: {
				year: '2000',

				springTeaching: 20,
				springService: 20,
				springResearch: 60,

				fallTeaching: 20,
				fallService: 20,
				fallResearch: 60,

				summerTeaching: 20,
				summerService: 20,
				summerResearch: 60
		 	}
		};

		it('should fail to be able to update a specific assignedActivity if not logged in', function(done) {
			request(app)
			  .put('/assignedActivity/' + aa1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to update a specific assignedActivity if the user does not own the assignedActivity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/assignedActivity/' + aa2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		assignedActivity: {
							year: '2000',

							springTeaching: 20,
							springService: 20,
							springResearch: 60,

							fallTeaching: 20,
							fallService: 20,
							fallResearch: 60,

							summerTeaching: 20,
							summerService: 20,
							summerResearch: 60
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

		it('should be able to update a specific assignedActivity if the user does own the assignedActivity and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/assignedActivity/' + aa1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		assignedActivity: {
							year: '2000',

							springTeaching: 20,
							springService: 20,
							springResearch: 60,

							fallTeaching: 20,
							fallService: 20,
							fallResearch: 60,

							summerTeaching: 20,
							summerService: 20,
							summerResearch: 60
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('year', assignedActivityObj.assignedActivity.year);

					  	res.body.should.have.property('springTeaching', assignedActivityObj.assignedActivity.springTeaching);
					  	res.body.should.have.property('springService', assignedActivityObj.assignedActivity.springService);
					  	res.body.should.have.property('springResearch', assignedActivityObj.assignedActivity.springResearch);

					  	res.body.should.have.property('fallTeaching', assignedActivityObj.assignedActivity.fallTeaching);
					  	res.body.should.have.property('fallService', assignedActivityObj.assignedActivity.fallService);
					  	res.body.should.have.property('fallResearch', assignedActivityObj.assignedActivity.fallResearch);

					  	res.body.should.have.property('summerTeaching', assignedActivityObj.assignedActivity.summerTeaching);
					  	res.body.should.have.property('summerService', assignedActivityObj.assignedActivity.summerService);
					  	res.body.should.have.property('summerResearch', assignedActivityObj.assignedActivity.summerResearch);

					  	res.body.should.have.property('_id');
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific assignedActivity if the user does not own the assignedActivity and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/assignedActivity/' + aa1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		assignedActivity: {
							year: '2000',

							springTeaching: 20,
							springService: 20,
							springResearch: 60,

							fallTeaching: 20,
							fallService: 20,
							fallResearch: 60,

							summerTeaching: 20,
							summerService: 20,
							summerResearch: 60
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('year', assignedActivityObj.assignedActivity.year);

					  	res.body.should.have.property('springTeaching', assignedActivityObj.assignedActivity.springTeaching);
					  	res.body.should.have.property('springService', assignedActivityObj.assignedActivity.springService);
					  	res.body.should.have.property('springResearch', assignedActivityObj.assignedActivity.springResearch);

					  	res.body.should.have.property('fallTeaching', assignedActivityObj.assignedActivity.fallTeaching);
					  	res.body.should.have.property('fallService', assignedActivityObj.assignedActivity.fallService);
					  	res.body.should.have.property('fallResearch', assignedActivityObj.assignedActivity.fallResearch);

					  	res.body.should.have.property('summerTeaching', assignedActivityObj.assignedActivity.summerTeaching);
					  	res.body.should.have.property('summerService', assignedActivityObj.assignedActivity.summerService);
					  	res.body.should.have.property('summerResearch', assignedActivityObj.assignedActivity.summerResearch);

					  	res.body.should.have.property('_id');
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific assignedActivity if the user does own the assignedActivity is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/assignedActivity/' + aa2.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		assignedActivity: {
							year: '2000',

							springTeaching: 20,
							springService: 20,
							springResearch: 60,

							fallTeaching: 20,
							fallService: 20,
							fallResearch: 60,

							summerTeaching: 20,
							summerService: 20,
							summerResearch: 60
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('year', assignedActivityObj.assignedActivity.year);

					  	res.body.should.have.property('springTeaching', assignedActivityObj.assignedActivity.springTeaching);
					  	res.body.should.have.property('springService', assignedActivityObj.assignedActivity.springService);
					  	res.body.should.have.property('springResearch', assignedActivityObj.assignedActivity.springResearch);

					  	res.body.should.have.property('fallTeaching', assignedActivityObj.assignedActivity.fallTeaching);
					  	res.body.should.have.property('fallService', assignedActivityObj.assignedActivity.fallService);
					  	res.body.should.have.property('fallResearch', assignedActivityObj.assignedActivity.fallResearch);

					  	res.body.should.have.property('summerTeaching', assignedActivityObj.assignedActivity.summerTeaching);
					  	res.body.should.have.property('summerService', assignedActivityObj.assignedActivity.summerService);
					  	res.body.should.have.property('summerResearch', assignedActivityObj.assignedActivity.summerResearch);

					  	res.body.should.have.property('_id');
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   
	});

	afterEach(function(done) {
		AssignedActivity.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
