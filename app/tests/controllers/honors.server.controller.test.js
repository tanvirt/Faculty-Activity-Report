'use strict';
/*jshint expr: true*/
var app = require('../../../server');
var should = require('should');
var request = require('supertest');
var	honors = require('../../controllers/honors/honors');
var mongoose = require('mongoose');
var Honors = mongoose.model('Honors');
var User = mongoose.model('User');
var Report = mongoose.model('Report');
var async = require('async');
var user, report, info;
describe('Honors Controller Tests', function() {
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
        info = new Honors({
            info: 'I received these honors...',
            report: report,
            user: user
        });
        info.save();
        done();
    });
    describe('Testing the GET methods', function() {
        it('should fail to get an honors if not logged in', function(done) {
            request(app)
                .get('/reports/' + report.id + '/honors')
                .set('Accept', 'application/json')
                
                .expect(401)
                .end(done);
        });
        it('should be able to get an honors associated with its report id', function(done) {
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
                            res.body.should.be.an.Object.and.have.property('info', info.info);
                            res.body.should.have.property('_id', info.id);
                            res.body.should.have.property('user', user.id);
                            res.body.should.have.property('report', report.id);
                            done();
                        });
                });
        });
        it('should fail to get a specific honors if not logged in', function(done) {
            request(app)
                .get('/honors/' + info.id)
                .set('Accept', 'application/json')
                
                .expect(401)
                .end(done);
        });
        it('should be able to get a specific honors based on its id', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                        .get('/honors/' + info.id)
                        .set('cookie', res.headers['set-cookie'])
                        .set('Accept', 'application/json')
                        
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);
                            res.body.should.be.an.Object;
                            res.body.should.have.property('_id', info.id);
                            res.body.should.have.property('user', user.id);
                            res.body.should.have.property('report', report.id);
                            done();
                        });
                });
        });
    });
    describe('Testing the POST methods', function() {
        var honorsObj = {
            honors: {
                info:'I am so honorable, look at all these honors'
            }
        };
        it('should fail to create an honors if not logged in', function(done) {
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
        it('should fail to update a specific honors if not logged in', function(done) {
            request(app)
                .put('/honors/' + info.id)
                .set('Accept', 'application/json')
                
                .expect(401)
                .end(done);
        });
        it('should be able to update a specific honors', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                        .put('/honors/' + info.id)
                        .set('cookie', res.headers['set-cookie'])
                        .set('Accept', 'application/json')
                        .send({
                            honors: {
                                info: 'so many honors'
                            }
                        })
                        
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);
                            res.body.should.be.an.Object.and.have.property('info', 'so many honors');
                            res.body.should.have.property('_id', info.id);
                            res.body.should.have.property('user', user.id);
                            res.body.should.have.property('report', report.id);
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
