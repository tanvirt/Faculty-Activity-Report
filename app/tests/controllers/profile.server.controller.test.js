'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');

var request = require('supertest');

var	pofileCtrl = require('../../controllers/profile/profile');

var mongoose = require('mongoose');
var AssignedActivity = mongoose.model('Profile');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var Name = mongoose.model('Name');
var Tenure = mongoose.model('Tenure');
var CurrentRank = mongoose.model('currentRank');
var DateAppointed = mongoose.model('DateAppointed');
var AffiliateAppointments = mongoose.model('affiliateAppointments');

var Profile = mongoose.model('Profile');

var async = require('async');

var user, report, profile, nameModel, tenure, currentRank, dateAppointed, affiliateAppointments;

describe('Profile Controller Tests', function() {
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

		nameModel = new Name({
			firstName: 'Full',
			middleName: 'A',
			lastName: 'Name',

			report: report,
			user: user
		});

		nameModel.save();

		tenure = new Tenure({
			tenure: 'Not Tenured',

			report: report,
			user: user
		});

		tenure.save();

		currentRank = new CurrentRank({
			rank: 'Professor',
			department: 'Agricultural and Biological Engineering',

			report: report,
			user: user
		});

		currentRank.save();

		dateAppointed = new DateAppointed({
			date: 'October 1993',

			report: report,
			user: user
		});

		dateAppointed.save();

		affiliateAppointments = new AffiliateAppointments({
			app: 'No Appointments Today',

			report: report,
			user: user
		});

		affiliateAppointments.save();

		profile = new Profile({
			name: nameModel,
			tenure: tenure,
			currentRank: currentRank,
			dateAppointed: dateAppointed,
			affiliateAppointments: affiliateAppointments,

			report: report,
			user: user
		});

		profile.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a profile if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/profile')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a profile associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/profile')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.name.should.be.an.Object.and.have.property('firstName', nameModel.firstName);
							res.body.name.should.be.an.Object.and.have.property('middleName', nameModel.middleName);
							res.body.name.should.be.an.Object.and.have.property('lastName', nameModel.lastName);

							res.body.tenure.should.be.an.Object.and.have.property('tenure', tenure.tenure);

							//res.body.dateAppointed.should.be.an.Object.and.have.property('date', dateAppointed.date);

							res.body.currentRank.should.be.an.Object.and.have.property('rank', currentRank.rank);
							res.body.currentRank.should.be.an.Object.and.have.property('department', currentRank.department);

							res.body.affiliateAppointments.should.be.an.Object.and.have.property('app', affiliateAppointments.app);

						  	
						  	res.body.should.have.property('_id', profile.id);
						  	res.body.should.have.property('user', user.id);
						  	res.body.should.have.property('report', report.id);

						  	done();
						});
				});
		});
	});

	describe('Testing the POST methods', function() {
		var profileObj = {
			name: {
			    firstName:'Ian',
			    middleName:'E',
			    lastName:'Fell'
			  },
			 
			  tenure: {
			    tenure:'Not Tenured'
			  },
			 
			  currentRank: {
			    rank: 'Professor',
			    department: 'Agricultural and Biological Engineering'
			  },

			  dateAppointed : {
			    date:'October 1993'
			  },
			 
			  affiliateAppointments: {
			    app:'No appointments yet'
			  }
		};

		it('should fail to be able to create a Profile if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/profile')
			  .set('Accept', 'application/json')
			  .send(profileObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new Profile', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/profile')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(profileObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);
					  	
						res.body.should.have.property('name');
						res.body.should.have.property('tenure');
						res.body.should.have.property('currentRank');
						res.body.should.have.property('dateAppointed');
						res.body.should.have.property('affiliateAppointments');

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');
					  	
					  	done();
					});
				});
		});
	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific Profile if not logged in', function(done) {
			request(app)
			  .put('/reports/' + report.id + '/profile/' + profile.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific Profile', function(done) {
			done();
			/*
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/reports/' + report.id + '/profile/' + profile.id)
					.set('cookie', res.headers['set-cookie'])
				  	//.set('Accept', 'application/json')
				  	.send({
				  		name: {
				  			firstName: 'Joe',
				  			lastName: 'Smoe'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', profile.id);
					  	res.body.should.have.property('user', user.id);
					  	res.body.should.have.property('report', report.id);
					  	

				  		done();
				  	});

				});
*/
		});
	    
	});

	afterEach(function(done) {
		Profile.remove().exec();

		Name.remove().exec();
		Tenure.remove().exec();
		DateAppointed.remove().exec();
		CurrentRank.remove().exec();
		AffiliateAppointments.remove().exec();

		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
