'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var	creativeWorks = require('../../controllers/creativeWorks/creativeWorks');

var mongoose = require('mongoose');
var CreativeWorks = mongoose.model('CreativeWorks');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, user2, user3, report, cw1, cw2, cw3, cw4;

describe('CreativeWorks Controller Tests', function() {
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

		cw1 = new CreativeWorks({
			name: 'BioVerto',
			description: 'a tool for visualizing and analyzing biological networks',
			website: 'http://bioverto.org',
			jointEfforts: ['Tammer Kahveci', 'Mickey Mouse', 'Donald Duck'],
			date: 'January 2013',

			report: report,
			user: user
		});

		cw2 = new CreativeWorks({
			name: 'DBO',
			description: 'a database system that estimates the query result while the query is processed.',
			website: 'http://bioverto.org',
			jointEfforts: ['Tammer Kahveci', 'Mickey Mouse', 'Donald Duck'],
			date: 'January 2006',

			report: report,
			user: user
		});

		cw3 = new CreativeWorks({
			name: 'DataPath',
			description: 'a fast database system particularly suited for large analytical query loads.',
			website: 'http://bioverto.org',
			jointEfforts: ['Tammer Kahveci', 'Mickey Mouse', 'Donald Duck'],
			date: 'January 2008',

			report: report,
			user: user
		});

		cw4 = new CreativeWorks({
			name: 'DataPath',
			description: 'a fast database system particularly suited for large analytical query loads.',
			website: 'http://bioverto.org',
			jointEfforts: ['Tammer Kahveci', 'Mickey Mouse', 'Donald Duck'],
			date: 'January 2008',

			report: report,
			user: user2
		});

		cw1.save();
		cw2.save();
		cw3.save();
		cw4.save();

		done();
	});

	describe('Testing the GET methods', function() {

		it('should fail to be able to get a creativeWorks if not logged in', function(done) {
			request(app)
			  .get('/reports/' + report.id + '/creativeWorks')
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to get creativeWorks associated with its report id', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
						.get('/reports/' + report.id + '/creativeWorks')
						.set('cookie', res.headers['set-cookie'])
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
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

		it('should fail to be able to get a specific creativeWorks if not logged in', function(done) {
			request(app)
			  .get('/creativeWorks/' + cw1.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should not be able to get a specific creativeWorks if the user does not own the creativeWorks and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/creativeWorks/' + cw4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.expect('Content-Type', /json/)
				  	.expect(403)
				  	.end(function(err, res) {
				  		should.not.exist(err);

				  		res.body.should.have.property('message').and.equal('User is not authorized');

				  		done();
				  	});

				});
		});    

		it('should be able to get a specific creativeWorks if the user does own the creativeWorks and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/creativeWorks/' + cw1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', cw1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific creativeWorks if the user does not own the creativeWorks and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/creativeWorks/' + cw1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', cw1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to get a specific creativeWorks if the user does own the creativeWorks is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.get('/creativeWorks/' + cw4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.have.property('_id', cw4.id);
					  	res.body.user.should.have.property('_id', user2.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});  

	});

	describe('Testing the POST methods', function() {

		var cwObj = {
			creativeWorks: {
			    name:'MyCompany',
			    description:'a high-quality product',
			    website:'MyWebsite.herokuapp.com',
			    date:'10/20/1984',
			    jointEfforts:['George','Gandalf','Rebecca']
		 	}
		};

		it('should fail to be able to create an creativeWorks if not logged in', function(done) {
			request(app)
			  .post('/reports/' + report.id + '/creativeWorks')
			  .set('Accept', 'application/json')
			  .send(cwObj)
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should be able to create a new creativeWorks', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					  .post('/reports/' + report.id + '/creativeWorks')
					  .set('cookie', res.headers['set-cookie'])
					  .set('Accept', 'application/json')
					  .send(cwObj)
					  .expect('Content-Type', /json/)
					  .expect(200)
					  .end(function(err, res) {
					  	should.not.exist(err);

					  	res.body.should.have.property('name', cwObj.creativeWorks.name);

					  	res.body.should.have.property('_id');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('report');

					  	done();
					  });
				});
		});

	});

	describe('Testing the PUT methods', function() {

		it('should fail to be able to update a specific creativeWorks if not logged in', function(done) {
			request(app)
			  .put('/creativeWorks/' + cw1.id)
			  .set('Accept', 'application/json')
			  .expect('Content-Type', /json/)
			  .expect(401)
			  .end(done);
		});

		it('should not be able to update a specific creativeWorks if the user does not own the creativeWorks and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/creativeWorks/' + cw4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		creativeWorks: {
				  			name:'DifferentName'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(403)
				  	.end(function(err, res) {
				  		should.not.exist(err);

				  		res.body.should.have.property('message').and.equal('User is not authorized');

				  		done();
				  	});

				});
		});    

		it('should be able to update a specific creativeWorks if the user does own the creativeWorks and is not a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'username',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/creativeWorks/' + cw1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		creativeWorks: {
				  			name:'DifferentName'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('name', 'DifferentName');

					  	res.body.should.have.property('_id', cw1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific creativeWorks if the user does not own the creativeWorks and is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/creativeWorks/' + cw1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		creativeWorks: {
				  			name:'DifferentName'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('name', 'DifferentName');

					  	res.body.should.have.property('_id', cw1.id);
					  	res.body.user.should.have.property('_id', user.id);
					  	res.body.report.should.have.property('_id', report.id);

				  		done();
				  	});

				});
		});   

		it('should be able to update a specific creativeWorks if the user does own the creativeWorks is a superuser', function(done) {
			request(app)
				.post('/auth/signin')
				.send({
					username:'admin',
					password:'password'
				})
				.expect(200)
				.end(function(err, res) {
					request(app)
					.put('/creativeWorks/' + cw4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.set('Accept', 'application/json')
				  	.send({
				  		creativeWorks: {
				  			name:'DifferentName'
				  		}
				  	})
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('name', 'DifferentName');

					  	res.body.should.have.property('_id', cw4.id);
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
				.delete('/creativeWorks/' + cw1.id)
				.expect('Content-Type', /json/)
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
					.delete('/creativeWorks/' + cw1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.expect('Content-Type', /json/)
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
					.delete('/creativeWorks/' + cw1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('name', cw1.name);
					  	res.body.should.have.property('description', cw1.description);
					  	res.body.should.have.property('website', cw1.website);
					  	res.body.should.have.property('date', cw1.date);

					  	res.body.should.have.property('report');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('_id');

					  	res.body.should.have.property('jointEfforts').and.be.an.instanceOf(Array).with.lengthOf(3);

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
					.delete('/creativeWorks/' + cw1.id)
					.set('cookie', res.headers['set-cookie'])
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('name', cw1.name);
					  	res.body.should.have.property('description', cw1.description);
					  	res.body.should.have.property('website', cw1.website);
					  	res.body.should.have.property('date', cw1.date);

					  	res.body.should.have.property('report');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('_id');

					  	res.body.should.have.property('jointEfforts').and.be.an.instanceOf(Array).with.lengthOf(3);

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
					.delete('/creativeWorks/' + cw4.id)
					.set('cookie', res.headers['set-cookie'])
				  	.expect('Content-Type', /json/)
				  	.expect(200)
				  	.end(function(err, res) {
				  		should.not.exist(err);

					  	res.body.should.be.an.Object.and.have.property('name', cw4.name);
					  	res.body.should.have.property('description', cw4.description);
					  	res.body.should.have.property('website', cw4.website);
					  	res.body.should.have.property('date', cw4.date);

					  	res.body.should.have.property('report');
					  	res.body.should.have.property('user');
					  	res.body.should.have.property('_id');

					  	res.body.should.have.property('jointEfforts').and.be.an.instanceOf(Array).with.lengthOf(3);

				  		done();
		  			});
				});
		});
	});

	afterEach(function(done) {
		CreativeWorks.remove().exec();
		User.remove().exec();
		Report.remove().exec();
		done();
	});
});
