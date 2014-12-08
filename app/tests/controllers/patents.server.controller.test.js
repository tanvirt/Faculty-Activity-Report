'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	patents = require('../../controllers/patents/patents');

var mongoose = require('mongoose');
var Patents = mongoose.model('Patents');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report, p1, p2, p3;

describe('Patents Controller Tests', function() {
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

		p1 = new Patents({
			title: 'New',
			authors: ['Me', 'Myself', 'I'],
			patentNumber: '1234',
			date: '10/07/2014',
			description: 'I wrote this book thingy all by myself and it is mine and you cannot have it hahahahahahahaha',
		
			report: report,
			user: user
		});
		
		p2 = new Patents({
			title: 'Alphabet',
			authors: ['A', 'B', 'C'],
			patentNumber: 'defg',
			date: '03/12/2000',
			description: 'hijklmnop',
		

			report: report,
			user: user
		});

		p3 = new Patents({
			title: 'Three',
			authors: ['one', '2', 'three'],
			patentNumber: '4380jfs084',
			date: '05/02/1999',
			description: 'lalalalalalala laklafnlkwnf',
		
			report: report,
			user: user
		});

		p1.save();
		p2.save();
		p3.save();

		done();
	});

	describe('Testing Save', function() {
		it('should save all three patents', function(done) {
			p1.save();
			p2.save();
			p3.save();
			done();
		});
	});
		
	describe('Testing the GET methods', function() {

		it('should fail to be able to get a patents if not logged in', function(done) {
			
			request(app)
			  .get('/reports/' + report.id + '/patents')
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get patents associated with its report id', function(done) {
			
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/patents')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Array;
							res.body.should.have.length(3);
							
							res.body[0].should.be.an.Object.and.have.property('title',p1.title);	
							res.body[1].should.be.an.Object.and.have.property('title',p2.title);	
							res.body[2].should.be.an.Object.and.have.property('title',p3.title);

						  	res.body[0].user.should.have.property('_id', user.id);
						  	res.body[0].report.should.have.property('_id', report.id);							

						  	done();
						});
				});
		});

		it('should fail to be able to get a specific patents if not logged in', function(done) {
			request(app)
			  .get('/patents/' + p1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to get a specific patents based on its id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .get('/patents/' + p1.id)
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('title', p1.title);

					  	res.body.should.have.property('_id', p1.id);
						res.body.user.should.have.property('_id', user.id);
						res.body.report.should.have.property('_id', report.id);

					  	done();
					  });
				});
		});

	});

	describe('Testing the POST methods', function() {

		var pObj = {
			patents: {
			    title: 'new patent',
				authors: ['albus', 'gandalf', 'the queen of york'],
				patentNumber: '8374SJF4GH93',
				date: '03/22/2004',
				description: 'the desc'
		 	}
		};

		it('should fail to be able to create an patents if not logged in', function(done) {
			
			request(app)
			  .post('/reports/' + report.id + '/patents')
			  .set('Accept', 'application/json')
			  .send(pObj)
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new patents', function(done) {
			
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/patents')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(pObj)
					  
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('title', pObj.patents.title);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific patents if not logged in', function(done) {
			
			request(app)
			  .put('/patents/' + p1.id)
			  .set('Accept', 'application/json')
			  
			  .expect(401)
			  .end(done);
		});

		it('should be able to update a specific patents', function(done) {
			
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/patents/' + p1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		patents: {
				  			title:'DifferentName'
				  		}
				  	})
				  	
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('title', 'DifferentName');

					  	res.body.should.have.property('_id', p1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});
			
	    
	});

	afterEach(function(done) {
		Patents.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
