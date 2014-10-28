'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    honors = mongoose.model('honors');
/**
 * Globals
 */
var info01;
describe('honors', function() {
    beforeEach(function(done) {
        info01 = new honors({
            info: ''

        });

        done();
    });
    describe('Method Save', function() {
        it('should be able to save without problem', function(done) {
            info01.save();
            done();
        });




    });
    afterEach(function(done) {
        honors.remove().exec();
        done();
    });
});

