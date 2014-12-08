'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var honors = require('../../controllers/honors/honors');

var mongoose = require('mongoose');
var Honors = mongoose.model('Honors');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, user2, h1, h2, report;

describe('Honors Honors Tests', function() {
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

        h1 = new Honors({
            info: 'I received the following honors...',

            report: report,
            user: user
        });

        h2 = new Honors({
            info: 'I received other honors',

            report: report,
            user: user2
        });

        h1.save();
        h2.save();

        done();
    });

    describe('Testing the GET methods', function() {

        it('should fail to be able to get an honors if not logged in', function(done) {
            request(app)
              .get('/reports/' + report.id + '/honors')
              .set('Accept', 'application/json')
              
              .expect(401)
              .end(done);
        });

        it('should be able to get honors associated with its report id', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                        .get('/reports/' + report.id + '/honors')
                        .set('cookie', res.headers['set-cookie'])
                        .set('Accept', 'application/json')
                        
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);

                            res.body.should.have.property('_id', h1.id);
                            res.body.should.have.property('info', h1.info);
                            res.body.user.should.have.property('_id', user.id);
                            res.body.report.should.have.property('_id', report.id);
                            done();
                        });
                });
        });

        it('should fail to be able to get a specific honors if not logged in', function(done) {
            request(app)
              .get('/honors/' + h1.id)
              .set('Accept', 'application/json')
              
              .expect(401)
              .end(done);
        });

        it('should not be able to get a specific honors if the user does not own the honors and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/honors/' + h2.id)
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

        it('should be able to get a specific honors if the user does own the honors and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/honors/' + h1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('_id', h1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to get a specific honors if the user does not own the honors and is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/honors/' + h1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('_id', h1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to get a specific honors if the user does own the honors is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/honors/' + h2.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('_id', h2.id);
                        res.body.user.should.have.property('_id', user2.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });  

    });

    describe('Testing the POST methods', function() {

        var honorsObj = {
            honors: {
                info:'Getting stuff'
            }
        };

        it('should fail to be able to create an honors if not logged in', function(done) {
            request(app)
              .post('/reports/' + report.id + '/honors')
              .set('Accept', 'application/json')
              .send(honorsObj)
              
              .expect(401)
              .end(done);
        });

        it('should be able to create a new honors', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                      .post('/reports/' + report.id + '/honors')
                      .set('cookie', res.headers['set-cookie'])
                      .set('Accept', 'application/json')
                      .send(honorsObj)
                      
                      .expect(200)
                      .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('info', honorsObj.honors.info);

                        res.body.should.have.property('_id');
                        res.body.should.have.property('user');
                        res.body.should.have.property('report');

                        done();
                      });
                });
        });

    });

    describe('Testing the PUT methods', function() {

        it('should fail to be able to update a specific honors if not logged in', function(done) {
            request(app)
              .put('/honors/' + h1.id)
              .set('Accept', 'application/json')
              
              .expect(401)
              .end(done);
        });

        it('should not be able to update a specific honors if the user does not own the honors and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/honors/' + h2.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        honors: {
                            info:'Different honors'
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

        it('should be able to update a specific honors if the user does own the honors and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/honors/' + h1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        honors: {
                            info:'Different honors'
                        }
                    })
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.be.an.Object.and.have.property('info', 'Different honors');

                        res.body.should.have.property('_id', h1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to update a specific honors if the user does not own the honors and is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/honors/' + h1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        honors: {
                            info:'Different honors'
                        }
                    })
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.be.an.Object.and.have.property('info', 'Different honors');

                        res.body.should.have.property('_id', h1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to update a specific honors if the user does own the honors is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/honors/' + h2.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        honors: {
                            info:'Different honors'
                        }
                    })
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.be.an.Object.and.have.property('info', 'Different honors');

                        res.body.should.have.property('_id', h2.id);
                        res.body.user.should.have.property('_id', user2.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   
    });

    afterEach(function(done) {
        Honors.remove().exec();
        User.remove().exec();
        Report.remove().exec();
        done();
    });
});
