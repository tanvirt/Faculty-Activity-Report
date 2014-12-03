'use strict';

/*jshint expr: true*/

var app = require('../../../../server');

var should = require('should');

var request = require('supertest');

var	teachingEvaluation = require('../../../controllers/teachingEvaluation/teachingEvaluation');

var mongoose = require('mongoose');
var TeachingEvaluation = mongoose.model('TeachingEvaluation');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, evaluationOne, evaluationTwo;

describe('TeachingEvaluation Controller Tests', function() {
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

		evaluationOne = new TeachingEvaluation({
			course: 'testCourse 101',
			year: '2014',
			semester: 'Spring',
			enrolled: '100',
			responses: '30',
			teacherMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
			departmentMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
			collegeMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],

			report: report,
			user: user
		});
		
		evaluationTwo = new TeachingEvaluation({
			course: 'testCourse 102',
			year: '2012',
			semester: 'Fall',
			enrolled: '200',
			responses: '60',
			teacherMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
			departmentMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
			collegeMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],

			report: report,
			user: user
		});

		evaluationOne.save();
		evaluationTwo.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a teachingEvaluation if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/teachingEvaluation')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get the teachingEvaluation(s) associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/teachingEvaluation')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

						  	res.body[0].should.be.an.Object.and.have.property('course', evaluationOne.course);
							res.body[1].should.be.an.Object.and.have.property('course', evaluationTwo.course);

						  	res.body[0].should.have.property('year', evaluationOne.year);
							res.body[1].should.have.property('year', evaluationTwo.year);
						  	res.body[0].should.have.property('semester', evaluationOne.semester);
							res.body[1].should.have.property('semester', evaluationTwo.semester);
						  	res.body[0].should.have.property('enrolled', evaluationOne.enrolled);
							res.body[1].should.have.property('enrolled', evaluationTwo.enrolled);
						  	res.body[0].should.have.property('responses', evaluationOne.responses);
							res.body[1].should.have.property('responses', evaluationTwo.responses);

						  	res.body[0].teacherMean.should.be.an.Array;
						  	res.body[0].departmentMean.should.be.an.Array;
						  	res.body[0].collegeMean.should.be.an.Array;

						  	res.body[0].should.have.property('_id', evaluationOne.id);
							res.body[1].should.have.property('_id', evaluationTwo.id);
							
						  	res.body[0].user.should.have.property('_id', user.id);
						  	res.body[0].report.should.have.property('_id', report.id);

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific teachingEvaluation if not logged in', function(done) {
			request(app)
			  .get('/teachingEvaluation/' + evaluationOne.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific teachingEvaluation based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
				//Uses SECOND evaluation for request
					request(app)
					  .get('/teachingEvaluation/' + evaluationTwo.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

						res.body.should.be.an.Object.and.have.property('course', evaluationTwo.course);

						res.body.should.have.property('year', evaluationTwo.year);
						res.body.should.have.property('semester', evaluationTwo.semester);
						res.body.should.have.property('enrolled', evaluationTwo.enrolled);
						res.body.should.have.property('responses', evaluationTwo.responses);

						res.body.teacherMean.should.be.an.Array;
						res.body.departmentMean.should.be.an.Array;
						res.body.collegeMean.should.be.an.Array;

					  	res.body.should.have.property('_id', evaluationTwo.id);
						res.body.user.should.have.property('_id', user.id);
						res.body.report.should.have.property('_id', report.id);

					  	done();
					  });
				});
		});
	});

	describe('Testing the POST methods', function() {

		var teObj = {
			teachingEvaluation: {
    	  		course: 'testCourse 101',
				year: '2014',
				semester: 'Spring',
				enrolled: '100',
				responses: '30',
				teacherMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
				departmentMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
				collegeMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1]
      		}
		};

		it('should fail to be able to create an teachingEvaluation if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/teachingEvaluation')
			  .set('Accept', 'application/json')
			  .send(teObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});


		it('should be able to create a new teachingEvaluation', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/teachingEvaluation')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(teObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

						res.body.should.be.an.Object.and.have.property('course', teObj.teachingEvaluation.course);

						res.body.should.have.property('year', teObj.teachingEvaluation.year);
						res.body.should.have.property('semester', teObj.teachingEvaluation.semester);
						res.body.should.have.property('enrolled', teObj.teachingEvaluation.enrolled);
						res.body.should.have.property('responses', teObj.teachingEvaluation.responses);

						res.body.teacherMean.should.be.an.Array;
						res.body.departmentMean.should.be.an.Array;
						res.body.collegeMean.should.be.an.Array;

					  	res.body.should.have.property('_id');
					  	//res.body.user.should.have.property('_id', user.id);
					  	//res.body.report.should.have.property('_id', report.id);
						res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

		it('should be able to create a new teachingEvaluation from excel file', function(done) {
			this.timeout(30000);
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/teachingEvaluation/excel')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .attach('file', './app/tests/controllers/teachingEvaluation/excelTest.xlsx')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

						res.body[0].should.be.an.Object.and.have.property('course', 'EXCL101');
						res.body[1].should.be.an.Object.and.have.property('course', 'EXCL102');

						//res.body[0].should.have.property('year', teObj.teachingEvaluation.year);
						//res.body[1].should.have.property('year', teObj.teachingEvaluation.year);
						//res.body[0].should.have.property('semester', teObj.teachingEvaluation.semester);
						//res.body[1].should.have.property('semester', teObj.teachingEvaluation.semester);
						res.body[0].should.have.property('enrolled', 50);
						res.body[1].should.have.property('enrolled', 100);
						res.body[0].should.have.property('responses', 15);
						res.body[1].should.have.property('responses', 45);

						res.body[0].teacherMean.should.be.an.Array;
						res.body[0].departmentMean.should.be.an.Array;
						res.body[0].collegeMean.should.be.an.Array;
						
						res.body[1].teacherMean.should.be.an.Array;
						res.body[1].departmentMean.should.be.an.Array;
						res.body[1].collegeMean.should.be.an.Array;

					  	res.body[0].should.have.property('_id');
					  	//res.body[0].user.should.have.property('_id', user.id);
					  	//res.body[0].report.should.have.property('_id', report.id);
						res.body[0].should.have.property('user', user.id);
					  	res.body[0].should.have.property('report', report.id);
						
					  	done();
					  });
				});
		});
	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific teachingEvaluation if not logged in', function(done) {
			request(app)
			  .put('/teachingEvaluation/' + evaluationOne.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific teachingEvaluation', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/teachingEvaluation/' + evaluationOne.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		teachingEvaluation: {
				  			year: 1999
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('course', evaluationOne.course);

						res.body.should.have.property('year', 1999);
						res.body.should.have.property('semester', evaluationOne.semester);
						res.body.should.have.property('enrolled', evaluationOne.enrolled);
						res.body.should.have.property('responses', evaluationOne.responses);

						res.body.teacherMean.should.be.an.Array;
						res.body.departmentMean.should.be.an.Array;
						res.body.collegeMean.should.be.an.Array;

					  	res.body.should.have.property('_id', evaluationOne.id);
						res.body.user.should.have.property('_id', user.id);
						res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});
				});
		});	
	});

	afterEach(function(done) {
		TeachingEvaluation.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
