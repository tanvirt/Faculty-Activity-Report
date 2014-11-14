'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    consultationsOutsideUniversity = mongoose.model('ConsultationsOutsideUniversity');
/**
 * Globals
 */
var con01;
describe('consultationsOutsideUniversity Model Unit Tests:', function() {
    beforeEach(function(done) {
        con01 = new consultationsOutsideUniversity({
            consultation: 'N/A'

        });

        done();
    });
    describe('Method Save', function() {
        it('should be able to save without problem', function(done) {
            con01.save();
            done();
        });

        it('should fail to save if the field is empty', function(done) {
            con01.consultation = '';
            return con01.save(function(err) {
                should.exist(err);
                done();
            });
        });


    });
    afterEach(function(done) {
        consultationsOutsideUniversity.remove().exec();
        done();
    });
});

