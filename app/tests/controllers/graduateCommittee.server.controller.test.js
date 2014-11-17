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

var user, report, committeeOne, committeeTwo, committeeThree;

describe('Graduate Committee Controller Tests', function() {
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

		committeeOne = new GraduateCommittee({
			role: 'Chair',
			studentName: 'studentTestName',
			degree: 'Ph.D.',
			major: 'Computer Science',
			degreeDate: '10/10/1990',

			report: report,
			user: user
		});
		
		committeeTwo = new GraduateCommittee({
			role: 'Co-Chair',
			studentName: 'studentTestName2',
			degree: 'Ph.D.',
			major: 'Computer Engineering',
			degreeDate: '11/11/1991',

			report: report,
			user: user
		});
		
		committeeThree = new GraduateCommittee({
			role: 'Chair',
			studentName: 'studentTestName3',
			degree: 'M.S.',
			major: 'Underwater Basket Weaving',
			degreeDate: '12/12/1992',

			report: report,
			user: user
		});

		committeeOne.save();
		committeeTwo.save();
		committeeThree.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a graduateCommittee if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/graduateCommittee')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get the graduateCommittee(s) associated with its report id', function(done) {
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
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

						  	res.body[0].should.be.an.Object.and.have.property('role', committeeOne.role);
							res.body[1].should.be.an.Object.and.have.property('role', committeeTwo.role);

						  	res.body[0].should.have.property('studentName', committeeOne.studentName);
							res.body[1].should.have.property('studentName', committeeTwo.studentName);
						  	res.body[0].should.have.property('degree', committeeOne.degree);
							res.body[1].should.have.property('degree', committeeTwo.degree);
						  	res.body[0].should.have.property('major', committeeOne.major);
							res.body[1].should.have.property('major', committeeTwo.major);
						  	res.body[0].should.have.property('degreeDate', committeeOne.degreeDate.toJSON());
							res.body[1].should.have.property('degreeDate', committeeTwo.degreeDate.toJSON());

						  	res.body[0].should.have.property('_id', committeeOne.id);
							res.body[1].should.have.property('_id', committeeTwo.id);
							
						  	res.body[0].should.have.property('user', user.id);
						  	res.body[0].should.have.property('report', report.id);

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific graduateCommittee if not logged in', function(done) {
			request(app)
			  .get('/graduateCommittee/' + committeeOne.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific graduateCommittee based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
				//Uses SECOND committee for request
					request(app)
					  .get('/graduateCommittee/' + committeeTwo.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

						res.body.should.be.an.Object.and.have.property('role', committeeTwo.role);

						res.body.should.have.property('studentName', committeeTwo.studentName);
						res.body.should.have.property('degree', committeeTwo.degree);
						res.body.should.have.property('major', committeeTwo.major);
						res.body.should.have.property('degreeDate', committeeTwo.degreeDate.toJSON());

					  	res.body.should.have.property('_id', committeeTwo.id);
						
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});
	});

	describe('Testing the POST methods', function() {

		var gcObj = {
			graduateCommittee: {
				role: 'Chair',
				studentName: 'studentTestNamePost',
				degree: 'Ph.D.',
				major: 'Computer Science Post',
				degreeDate: '09/09/1999'
      		}
		};

		it('should fail to be able to create an graduateCommittee if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/graduateCommittee')
			  .set('Accept', 'application/json')
			  .send(gcObj)
			  .expect('Content-Type', /json/)
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
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

						res.body.should.be.an.Object.and.have.property('role', gcObj.graduateCommittee.role);

						res.body.should.have.property('studentName', gcObj.graduateCommittee.studentName);
						res.body.should.have.property('degree', gcObj.graduateCommittee.degree);
						res.body.should.have.property('major', gcObj.graduateCommittee.major);
						
						var testDate = new Date(gcObj.graduateCommittee.degreeDate); //Date formats weird with JSON
						res.body.should.have.property('degreeDate', testDate.toJSON());

					  	res.body.should.have.property('_id');
						
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific graduateCommittee if not logged in', function(done) {
			request(app)
			  .put('/graduateCommittee/' + committeeOne.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific graduateCommittee', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
				//Uses THIRD committee for request
					request(app)
					.put('/graduateCommittee/' + committeeThree.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		graduateCommittee: {
				  			major: 'Art History'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('role', committeeThree.role);

						res.body.should.have.property('major', 'Art History');
						res.body.should.have.property('studentName', committeeThree.studentName);
						res.body.should.have.property('degree', committeeThree.degree);
						res.body.should.have.property('degreeDate', committeeThree.degreeDate.toJSON());

					  	res.body.should.have.property('_id', committeeThree.id);
						
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);

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
