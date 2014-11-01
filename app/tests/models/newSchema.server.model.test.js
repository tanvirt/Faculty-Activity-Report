'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    NewSchema = mongoose.model('NewSchema');
/**
 * Globals
 */
var ns01;
describe('NewSchema Model Unit Tests:', function() {
    beforeEach(function(done) {
        ns01 = new NewSchema({
            section: 'New Section',
			desc: 'lalalala lalala lakdncl'
        });

        done();
    });
    describe('Method Save', function() {
        it('should be able to save without problem', function(done) {
            ns01.save();
            done();
        });

        it('should fail to save if section is empty', function(done) {
            ns01.section = '';
            return ns01.save(function(err) {
                should.exist(err);
                done();
            });
        });

		it('should fail to save if desc is empty', function(done) {
            ns01.desc = '';
            return ns01.save(function(err) {
                should.exist(err);
                done();
            });
        });

    });
    afterEach(function(done) {
        NewSchema.remove().exec();
        done();
    });
});
