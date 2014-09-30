'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    AssignedActivity = mongoose.model('DateAppointed');
/**
 * Globals
 */
var date01;
describe('DateAppointed Model Unit Tests:', function() {
    beforeEach(function(done) {
        date01 = new DateAppointed({
            month: 'January',
            year: '2014'

        });

        done();
    });
    describe('Method Save', function() {
        it('should be able to save without problem', function(done) {
            date01.save();
            done();
        });
        it('should fail to save a year that is beyond the present year', function(done) {
            date01.year = 2016;
            return date01.save(function(err) {
                should.exist(err);
                done();
            });
        });
        it('should fail to save a year that is below 1900', function(done) {
            date01.year = 1899;
            return date01.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should fail to save if the month is not entered in the correct format (January)', function(done) {
            date01.month = 'Jan';
            return date01.save(function(err) {
                should.exist(err);
                done();
            });
        });


    });
    afterEach(function(done) {
        DateAppointed.remove().exec();
        done();
    });
});
