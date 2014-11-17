'use strict';

/*jshint expr: true*/

var app = require('../../server');

var should = require('should');
var request = require('supertest');

var	reports = require('../controllers/reports');

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var user1, user2, report1, report2;

describe('Reports Controller Tests', function() {
	beforeEach(function(done) {

		user1 = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local',
			roles: ['admin']
		});

		user1.save();

		report1 = new Report({
			reportName: 'MyReportName01',
			user: user1
		});

		report1.save();

		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'username2',
			password: 'password',
			provider: 'local'
		});

		user2.save();

		report2 = new Report({
			reportName: 'MyReportName02',
			user: user2
		});

		report2.save();

		done();
	});

	describe('Testing the GET methods', function() {
		describe('/reports', function() {
			it('should get 401 when listing the reports if the user is not logged in', function(done) {
				request(app)
					.get('/reports')
					.expect(401)
					.end(function(err, res) {
						should.not.exist(err);
						done();
					});
			});

			it('should only get the list of reports belonging to the user that requested them', function(done) {
				request(app)
					.post('/auth/signin')
					.send({
						username: 'username2',
						password: 'password'
					})
					.expect(200)
					.end(function(err, res) {
						request(app)
						.get('/reports')
						.set('cookie', res.headers['set-cookie'])
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Array;

							res.body.should.have.length(1);

							for(var i=0; i<res.body.length; i++) {
								res.body[i].user.should.be.an.Object.and.have.property('_id', user2.id);
							}

							done();
						});
					});
			});

			it('should get the list of all reports if an admin', function(done) {
				request(app)
					.post('/auth/signin')
					.send({
						username: 'username',
						password: 'password'
					})
					.expect(200)
					.end(function(err, res) {
						request(app)
							.get('/reports')
							.set('cookie', res.headers['set-cookie'])
							.expect(200)
							.end(function(err, res) {
								should.not.exist(err);

								res.body.should.be.an.Array;
								res.body.should.have.length(2);

								for(var i=0; i<res.body.length; i++) {
									res.body[i].user.should.be.an.Object.and.have.property('_id');
								}

								done();
							});
					});
			});
		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
