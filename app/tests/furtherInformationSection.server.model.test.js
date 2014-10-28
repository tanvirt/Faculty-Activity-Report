'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    furtherInformationSection = mongoose.model('furtherInformationSection');
/**
 * Globals
 */
var info01;
describe('furtherInformationSection Model Unit Tests:', function() {
    beforeEach(function(done) {
        info01 = new furtherInformationSection({
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
        furtherInformationSection.remove().exec();
        done();
    });
});

