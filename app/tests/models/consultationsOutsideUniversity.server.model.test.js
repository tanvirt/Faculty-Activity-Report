'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    ConsultationsOutsideUniversity = mongoose.model('ConsultationsOutsideUniversity');
/**
 * Globals
 */
var con01;
describe('consultationsOutsideUniversity Model Unit Tests:', function() {
    beforeEach(function(done) {
        con01 = new ConsultationsOutsideUniversity({
            info: 'My Consultations'
        });

        done();
    });

    describe('Method Save', function() {
        it('should be able to save without problem', function(done) {
            con01.save();
            done();
        });
    });

    afterEach(function(done) {
        ConsultationsOutsideUniversity.remove().exec();
        done();
    });
});

