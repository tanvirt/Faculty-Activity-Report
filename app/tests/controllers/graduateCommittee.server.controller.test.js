'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	graduateCommittee = require('../../controllers/graduateCommittee/graduateCommittee');

var mongoose = require('mongoose');
var GraduateCommittee = mongoose.model('GraduateCommittee');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, user2, user3, report, gc1, gc2, gc3, gc4;

describe('GraduateCommittee Controller Tests', function() {
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

		user3 = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'username2',
			password: 'password',
			provider: 'local'
		});

		user3.save();

		report = new Report({
			reportName: 'MyReportName',
			user: user
		});

		report.save();

		gc1 = new GraduateCommittee({
			role: 'Chair',
			studentName: 'studentTestName',
			degree: 'Ph.D.',
			major: 'Computer Science',
			degreeDate: '10/10/1990',

			report: report,
			user: user
		});

		gc2 = new GraduateCommittee({
			role: 'Co-Chair',
			studentName: 'studentTestName2',
			degree: 'Ph.D.',
			major: 'Computer Engineering',
			degreeDate: '11/11/1991',

			report: report,
			user: user
		});

		gc3 = new GraduateCommittee({
			role: 'Chair',
			studentName: 'studentTestName3',
			degree: 'M.S.',
			major: 'Underwater Basket Weaving',
			degreeDate: '12/12/1992',

			report: report,
			user: user
		});

		gc4 = new GraduateCommittee({
			role: 'Chair',
			studentName: 'studentTestName4',
			degree: 'M.S.',
			major: 'Knitting',
			degreeDate: '10/20/1997',

			report: report,
			user: user2
		});

		gc1.save();
		gc2.save();
		gc3.save();
		gc4.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a graduateCommittee if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/graduateCommittee')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get graduateCommittee associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/graduateCommittee')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Array;
							res.body.should.have.length(4);

							res.body[0].should.be.an.Object;	
							res.body[1].should.be.an.Object;	
							res.body[2].should.be.an.Object;
							res.body[3].should.be.an.Object;						

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific graduateCommittee if not logged in', function(done) {
			request(app)
			  .get('/graduateCommittee/' + gc1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to get a specific graduateCommittee if the user does not own the graduateCommittee and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/graduateCommittee/' + gc4.id)
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

		it('should be able to get a specific graduateCommittee if the user does own the graduateCommittee and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/graduateCommittee/' + gc1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', gc1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific graduateCommittee if the user does not own the graduateCommittee and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/graduateCommittee/' + gc1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', gc1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific graduateCommittee if the user does own the graduateCommittee is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/graduateCommittee/' + gc4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', gc4.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});  

	});

	describe('Testing the POST methods', function() {

		var gcObj = {
			graduateCommittee: {
			    role: 'Co-Chair',
				studentName: 'studentTestName',
				degree: 'Ph.D.',
				major: 'Electrical Engineering',
				degreeDate: '03/29/1994'
		 	}
		};

		it('should fail to be able to create a graduateCommittee if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/graduateCommittee')
			  .set('Accept', 'application/json')
			  .send(gcObj)
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new graduateCommittee', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/graduateCommittee')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(gcObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('role', gcObj.graduateCommittee.role);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific graduateCommittee if not logged in', function(done) {
			request(app)
			  .put('/graduateCommittee/' + gc1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should not be able to update a specific graduateCommittee if the user does not own the graduateCommittee and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/graduateCommittee/' + gc4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		graduateCommittee: {
				  			role:'Chair'
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

		it('should be able to update a specific graduateCommittee if the user does own the graduateCommittee and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/graduateCommittee/' + gc1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		graduateCommittee: {
				  			role:'Minor'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('role', 'Minor');

					  	res.body.should.have.property('_id', gc1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific graduateCommittee if the user does not own the graduateCommittee and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/graduateCommittee/' + gc1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		graduateCommittee: {
				  			role:'External'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('role', 'External');

					  	res.body.should.have.property('_id', gc1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific graduateCommittee if the user does own the graduateCommittee is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/graduateCommittee/' + gc4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		graduateCommittee: {
				  			role:'Minor'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('role', 'Minor');

					  	res.body.should.have.property('_id', gc4.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   
	});

	describe('Testing the DELETE methods', function() {
		it('should not be able to delete if not logged in', function(done) {
			request(app)
				.delete('/graduateCommittee/' + gc1.id)
				
				.expect(401)
				.end(done);
		});

		it('should not be able to delete if user does not own the report and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username2',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.delete('/graduateCommittee/' + gc1.id)
					.set('cookie', res.headers['set-cookie'])
				  	
				  	.expect(403)
				  	.end(function(err, res) {
				  		should.not.exist(err);
				  		done();
				  	});

			});
		});

		it('should be able to delete if user owns the report and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.delete('/graduateCommittee/' + gc1.id)
					.set('cookie', res.headers['set-cookie'])
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('role', gc1.role);
					  	res.body.should.have.property('studentName', gc1.studentName);
					  	res.body.should.have.property('degree', gc1.degree);
					  	res.body.should.have.property('major', gc1.major);

					  	res.body.should.have.property('report');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('_id');

				  		done();
		  			});
				});
		});

		it('should be able to delete if user does not own the report and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.delete('/graduateCommittee/' + gc1.id)
					.set('cookie', res.headers['set-cookie'])
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('role', gc1.role);
					  	res.body.should.have.property('studentName', gc1.studentName);
					  	res.body.should.have.property('degree', gc1.degree);
					  	res.body.should.have.property('major', gc1.major);

					  	res.body.should.have.property('report');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('_id');

				  		done();
		  			});
				});
		});

	it('should be able to delete if user does own the report and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.delete('/graduateCommittee/' + gc4.id)
					.set('cookie', res.headers['set-cookie'])
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('role', gc4.role);
					  	res.body.should.have.property('studentName', gc4.studentName);
					  	res.body.should.have.property('degree', gc4.degree);
					  	res.body.should.have.property('major', gc4.major);

					  	res.body.should.have.property('report');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('_id');

				  		done();
		  			});
				});
		});
	});

	afterEach(function(done) {
		GraduateCommittee.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
