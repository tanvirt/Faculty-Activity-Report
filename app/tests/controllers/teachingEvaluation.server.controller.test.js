'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');

var request = require('supertest');

var	teachingEvaluation = require('../../controllers/teachingEvaluation/teachingEvaluation');

var mongoose = require('mongoose');
var TeachingEvaluation = mongoose.model('TeachingEvaluation');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, te;

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

		te = new TeachingEvaluation({
			course: 'testCourse 101',
			year: '2014',
			semester: 'spring',
			enrolled: '100',
			responses: '30',
			teacherMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
			departmentMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],
			collegeMean: [1, 2, 3, 4, 5, 1, 2, 3, 4, 1],

			report: report,
			user: user
		});

		te.save();

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

		it('should be able to get an teachingEvaluation associated with its report id', function(done) {
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

						  	res.body.should.be.an.Object.and.have.property('course', te.course);

						  	res.body.should.have.property('year', te.year);
						  	res.body.should.have.property('semester', te.semester);
						  	res.body.should.have.property('enrolled', te.enrolled);
						  	res.body.should.have.property('responses', te.responses);

						  	res.body.teacherMean.should.be.an.Array;
						  	res.body.departmentMean.should.be.an.Array;
						  	res.body.collegeMean.should.be.an.Array;

						  	res.body.should.have.property('_id', te.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific teachingEvaluation if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/teachingEvaluation/' + te.id)
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
					request(app)
					  .get('/reports/' + report.id + '/teachingEvaluation/' + te.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

						res.body.should.be.an.Object.and.have.property('course', te.course);

						res.body.should.have.property('year', te.year);
						res.body.should.have.property('semester', te.semester);
						res.body.should.have.property('enrolled', te.enrolled);
						res.body.should.have.property('responses', te.responses);

						res.body.teacherMean.should.be.an.Array;
						res.body.departmentMean.should.be.an.Array;
						res.body.collegeMean.should.be.an.Array;

					  	res.body.should.have.property('_id', te.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

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
				semester: 'spring',
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
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific teachingEvaluation if not logged in', function(done) {
			request(app)
			  .put('/reports/' + report.id + '/teachingEvaluation/' + te.id)
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
					.put('/reports/' + report.id + '/teachingEvaluation/' + te.id)
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

					  	res.body.should.be.an.Object.and.have.property('course', te.course);

						res.body.should.have.property('year', 1999);
						res.body.should.have.property('semester', te.semester);
						res.body.should.have.property('enrolled', te.enrolled);
						res.body.should.have.property('responses', te.responses);

						res.body.teacherMean.should.be.an.Array;
						res.body.departmentMean.should.be.an.Array;
						res.body.collegeMean.should.be.an.Array;

					  	res.body.should.have.property('_id', te.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

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
