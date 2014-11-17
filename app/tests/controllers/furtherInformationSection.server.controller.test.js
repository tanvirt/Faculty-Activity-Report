'use strict';
/*jshint expr: true*/
var app = require('../../../server');
var should = require('should');
var request = require('supertest');
var	furtherInformationSection = require('../../controllers/furtherInformationSection/furtherInformationSection');
var mongoose = require('mongoose');
var FurtherInformationSection = mongoose.model('FurtherInformationSection');
var User = mongoose.model('User');
var Report = mongoose.model('Report');
var async = require('async');
var user, report, info;
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
        report = new Report({
            reportName: 'MyReportName',
            user: user
        });
        report.save();
        info = new FurtherInformationSection({
            info: 'I received these furtherInformationSection...',
            report: report,
            user: user
        });
        info.save();
        done();
    });
    describe('Testing the GET methods', function() {
        it('should fail to get an furtherInformationSection if not logged in', function(done) {
            request(app)
                .get('/reports/' + report.id + '/furtherInformationSection')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(done);
        });
        it('should be able to get an furtherInformationSection associated with its report id', function(done) {
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
                        .expect('Content-Type', /json/)
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
        it('should fail to get a specific furtherInformationSection if not logged in', function(done) {
            request(app)
                .get('/furtherInformationSection/' + info.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(done);
        });
        it('should be able to get a specific furtherInformationSection based on its id', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                        .get('/furtherInformationSection/' + info.id)
                        .set('cookie', res.headers['set-cookie'])
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
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
        var furtherInformationSectionObj = {
            furtherInformationSection: {
                info:'Look at all this information'
            }
        };
        it('should fail to create an furtherInformationSection if not logged in', function(done) {
            request(app)
                .post('/reports/' + report.id + '/furtherInformationSection')
                .set('Accept', 'application/json')
                .send(furtherInformationSectionObj)
                .expect('Content-Type', /json/)
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
                        .expect('Content-Type', /json/)
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
        it('should fail to update a specific furtherInformationSection if not logged in', function(done) {
            request(app)
                .put('/furtherInformationSection/' + info.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(done);
        });
        it('should be able to update a specific furtherInformationSection', function(done) {
            request(app)
                .post('/auth/signin')
                .send({
                    username:'username',
                    password:'password'
                })
                .expect(200)
                .end(function(err, res) {
                    request(app)
                        .put('/furtherInformationSection/' + info.id)
                        .set('cookie', res.headers['set-cookie'])
                        .set('Accept', 'application/json')
                        .send({
                            furtherInformationSection: {
                                info: 'so much info'
                            }
                        })
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);
                            res.body.should.be.an.Object.and.have.property('info', 'so much info');
                            res.body.should.have.property('_id', info.id);
                            res.body.should.have.property('user', user.id);
                            res.body.should.have.property('report', report.id);
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
