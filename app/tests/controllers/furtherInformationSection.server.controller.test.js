'use strict';

/*jshint expr: true*/

var app = require('../../../server');

var should = require('should');
var request = require('supertest');

var furtherInformationSection = require('../../controllers/furtherInformationSection/furtherInformationSection');

var mongoose = require('mongoose');
var FurtherInformationSection = mongoose.model('FurtherInformationSection');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, user2, f1, f2, report;

describe('FurtherInformationSection Controller Tests', function() {
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

        f1 = new FurtherInformationSection({
            info: 'I have nothing more to say',

            report: report,
            user: user
        });

        f2 = new FurtherInformationSection({
            info: 'I have more to say',

            report: report,
            user: user2
        });

        f1.save();
        f2.save();

        done();
    });

    describe('Testing the GET methods', function() {

        it('should fail to be able to get a furtherInformationSection if not logged in', function(done) {
            request(app)
              .get('/reports/' + report.id + '/furtherInformationSection')
              .set('Accept', 'application/json')
              
              .expect(401)
              .end(done);
        });

        it('should be able to get furtherInformationSection associated with its report id', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                        .get('/reports/' + report.id + '/furtherInformationSection')
                        .set('cookie', res.headers['set-cookie'])
                        .set('Accept', 'application/json')
                        
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);

                            res.body.should.have.property('_id', f1.id);
                            res.body.should.have.property('info', f1.info);
                            res.body.user.should.have.property('_id', user.id);
                            res.body.report.should.have.property('_id', report.id);
                            done();
                        });
                });
        });

        it('should fail to be able to get a specific furtherInformationSection if not logged in', function(done) {
            request(app)
              .get('/furtherInformationSection/' + f1.id)
              .set('Accept', 'application/json')
              
              .expect(401)
              .end(done);
        });

        it('should not be able to get a specific furtherInformationSection if the user does not own the furtherInformationSection and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/furtherInformationSection/' + f2.id)
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

        it('should be able to get a specific furtherInformationSection if the user does own the furtherInformationSection and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/furtherInformationSection/' + f1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('_id', f1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to get a specific furtherInformationSection if the user does not own the furtherInformationSection and is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/furtherInformationSection/' + f1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('_id', f1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to get a specific furtherInformationSection if the user does own the furtherInformationSection is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .get('/furtherInformationSection/' + f2.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('_id', f2.id);
                        res.body.user.should.have.property('_id', user2.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });  

    });

    describe('Testing the POST methods', function() {

        var furtherInformationSectionObj = {
            furtherInformationSection: {
                info:'Nothing more'
            }
        };

        it('should fail to be able to create a furtherInformationSection if not logged in', function(done) {
            request(app)
              .post('/reports/' + report.id + '/furtherInformationSection')
              .set('Accept', 'application/json')
              .send(furtherInformationSectionObj)
              
              .expect(401)
              .end(done);
        });

        it('should be able to create a new furtherInformationSection', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                      .post('/reports/' + report.id + '/furtherInformationSection')
                      .set('cookie', res.headers['set-cookie'])
                      .set('Accept', 'application/json')
                      .send(furtherInformationSectionObj)
                      
                      .expect(200)
                      .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.have.property('info', furtherInformationSectionObj.furtherInformationSection.info);

                        res.body.should.have.property('_id');
                        res.body.should.have.property('user');
                        res.body.should.have.property('report');

                        done();
                      });
                });
        });

    });

    describe('Testing the PUT methods', function() {

        it('should fail to be able to update a specific furtherInformationSection if not logged in', function(done) {
            request(app)
              .put('/furtherInformationSection/' + f1.id)
              .set('Accept', 'application/json')
              
              .expect(401)
              .end(done);
        });

        it('should not be able to update a specific furtherInformationSection if the user does not own the furtherInformationSection and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/furtherInformationSection/' + f2.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        furtherInformationSection: {
                            info:'More stuff'
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

        it('should be able to update a specific furtherInformationSection if the user does own the furtherInformationSection and is not a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/furtherInformationSection/' + f1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        furtherInformationSection: {
                            info:'More stuff'
                        }
                    })
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.be.an.Object.and.have.property('info', 'More stuff');

                        res.body.should.have.property('_id', f1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to update a specific furtherInformationSection if the user does not own the furtherInformationSection and is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/furtherInformationSection/' + f1.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        furtherInformationSection: {
                            info:'More stuff'
                        }
                    })
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.be.an.Object.and.have.property('info', 'More stuff');

                        res.body.should.have.property('_id', f1.id);
                        res.body.user.should.have.property('_id', user.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   

        it('should be able to update a specific furtherInformationSection if the user does own the furtherInformationSection is a superuser', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'admin',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                    .put('/furtherInformationSection/' + f2.id)
                    .set('cookie', res.headers['set-cookie'])
                    .set('Accept', 'application/json')
                    .send({
                        furtherInformationSection: {
                            info:'More stuff'
                        }
                    })
                    
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.be.an.Object.and.have.property('info', 'More stuff');

                        res.body.should.have.property('_id', f2.id);
                        res.body.user.should.have.property('_id', user2.id);
                        res.body.report.should.have.property('_id', report.id);

                        done();
                    });

                });
        });   
    });

    afterEach(function(done) {
        FurtherInformationSection.remove().exec();
        User.remove().exec();
        Report.remove().exec();
        done();
    });
});
