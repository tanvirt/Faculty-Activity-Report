'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    affiliateAppointments = mongoose.model('affiliateAppointments');
/**
 * Globals
 */
var app01;
describe('affiliateAppointments Model Unit Tests:', function() {
    beforeEach(function(done) {
        app01 = new affiliateAppointments({
            app: 'None'

        });

        done();
    });
    describe('Method Save', function() {
        it('should be able to save without problem', function(done) {
            app01.save();
            done();
        });

        it('should fail to save if the field is empty', function(done) {
            app01.app = '';
            return app01.save(function(err) {
                should.exist(err);
                done();
            });
        });


    });
    afterEach(function(done) {
        affiliateAppointments.remove().exec();
        done();
    });
});
