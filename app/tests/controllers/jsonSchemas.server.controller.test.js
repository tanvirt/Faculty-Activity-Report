'use strict';

/*jshint expr: true*/

var should = require('should'),
	request = require('supertest'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	JSONSchema = mongoose.model('JSONSchemas'),
	app = require('../../../server'),
	async = require('async');

var user, admin, json;

/*
the following json object came
from an example on the website

https://www.npmjs.org/package/mongoose-gen

*/

var book = 
	'"title": {' 							+
		'"type": "String",' 				+ 
		'"trim": true,' 					+
		'"index": true,' 					+
		'"required": true' 					+
	'},' 									+
    '"year": {' 							+
    	'"type": "Number",' 				+ 
    	'"max": 2012,' 						+ 
    	'"validate": "validateBookYear"' 	+
    '},' 									+
    '"author": {'							+
    	'"type": "ObjectId",'				+
    	'"ref": "Author",' 					+
    	'"index": true,'					+
    	'"required": true' 					+
    '}';

function login(credentials, prevRes, cb) {
	request(app)
		.post('/auth/signin')
		.send(credentials)
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res) {
			should.not.exist(err);
			
			res.body.should.be.an.Object;

			res.body.should.have.property('_id');
			res.body.should.have.property('__v');
			res.body.should.have.property('created');
			res.body.should.have.property('roles');

			delete res.body._id;
			delete res.body.__v;
			delete res.body.created;
			delete res.body.roles;

			res.body.should.eql({ 
			  username: credentials.username,
			  provider: 'local',
			  email: 'test@test.com',
			  lastName: 'Name',
			  firstName: 'Full' 
			});

			cb(res);
		});	
};

function verifyJSON(obj) {
	obj.should.be.an.Object.and.have.property('_id');
	obj.should.have.property('__v');
	obj.should.have.property('user');

	delete obj._id;
	delete obj.__v;
	delete obj.user;

	obj.should.have.property('json', json.json);
};

function create(prevRes, cb) {
	request(app)
		.post('/jsonToSchema')
		.send(json)
		.set('cookie', prevRes.headers['set-cookie'])
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res) {
			should.not.exist(err);

			JSONSchema.findOne(function(err, result) {
				should.not.exist(err);

				verifyJSON(result);
			});

			verifyJSON(res.body);

			cb(res);
		});
};

describe('JSON Schemas Controller Test', function() {
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

		admin = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'admin',
			password: 'password',
			provider: 'local',
			roles: ['admin']
		});

		admin.save();

		json = {
			json: book
		};

		done();
	});

	describe('GET methods', function() {
		describe('/jsonToSchema', function() {
			it('should give 401 if not logged in', function(done) {
				request(app)
					.get('/jsonToSchema')
					.expect(401)
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						should.not.exist(err);

						res.body.should.be.an.Object.and.eql({ 
							message: 'User is not logged in' 
						});

						done();
					});
			});

			it('should give 403 if logged in user is not authorized', function(done) {
				login({
					username: 'username',
					password: 'password'
				}, null, function(res) {
					request(app)
						.get('/jsonToSchema')
						.set('cookie', res.headers['set-cookie'])
						.expect(403)
						.expect('Content-Type', 'text/html; charset=utf-8')
						.end(function(err, res) {
							should.not.exist(err);

							res.text.should.be.a.String.and.equal('User is not authorized');

							done();
						});
				});
			});

			it('should return an empty array if nothing exists in the collection', function(done) {
				login({
					username: 'admin',
					password: 'password'
				}, null, function(res) {
					request(app)
						.get('/jsonToSchema')
						.set('cookie', res.headers['set-cookie'])
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function(err, res) {
							should.not.exist(err);

							res.body.should.be.an.Array.and.have.length(0);

							done();
						});
				});
			});

			it('should return json if a document exists in the collection', function(done) {
				login({
					username: 'admin',
					password: 'password'
				}, null, function(resA) {
					create(resA, function(resB) {
						request(app)
							.get('/jsonTOSchema')
							.set('cookie', resA.headers['set-cookie'])
							.expect(200)
							.expect('Content-Type', /json/)
							.end(function(err, res) {
								should.not.exist(err);

								verifyJSON(res.body[0]);

								done();
							});
					});
				});
			});

		});
	});

	describe('POST methods', function() {
		describe('/jsonToSchema', function() {
			it('should give 401 if not logged in', function(done) {
				request(app)
					.post('/jsonToSchema')
					.send(json)
					.expect(401)
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						should.not.exist(err);

						res.body.should.be.an.Object.and.eql({ 
							message: 'User is not logged in' 
						});

						done();
					});
			});

			it('should give 403 if logged in user is not authorized', function(done) {
				login({
					username: 'username',
					password: 'password'
				}, null, function(res) {
					request(app)
						.post('/jsonToSchema')
						.send(json)
						.set('cookie', res.headers['set-cookie'])
						.expect(403)
						.expect('Content-Type', 'text/html; charset=utf-8')
						.end(function(err, res) {
							should.not.exist(err);

							res.text.should.be.a.String.and.equal('User is not authorized');

							done();
						});
				});
			});

			it('should save to the database and respond with json', function(done) {
				login({
					username: 'admin',
					password: 'password'
				}, null, function(resA) {
					create(resA, function(resB) {
						done();
					});
				});
			});
		});
	});

	describe('PUT methods', function() {

	});

	describe('DELETE methods', function() {

	});

	afterEach(function(done) {
		User.remove().exec();
		JSONSchema.remove().exec();
		done();
	});
});