'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    currentRank = mongoose.model('CurrentRank');
/**
 * Globals
 */
 
var rank01;
describe('currentRank Model Unit Tests:', function() {
    beforeEach(function(done) {
        rank01 = new currentRank({
            rank: 'Professor',
            department: 'Computer and Informational Science and Engineering'
        });

        done();
    });
    describe('Method Save', function() {
        it('should be able to save without problem', function(done) {
            rank01.save();
            done();
        });
		
		it('should fail to save without rank', function(done) {
			rank01.rank = '';
			return rank01.save(function(err) {
                should.exist(err);
                done();
            });
		});

        it('should fail to save if the rank is not one of the possible ranks', function(done) {
            rank01.rank = 'asdf';
            return rank01.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should fail to save if the department is not one of the possible departments', function(done) {
            rank01.department = 'asdf';
            return rank01.save(function(err) {
                should.exist(err);
                done();
            });
        });

    });
    afterEach(function(done) {
        currentRank.remove().exec();
        done();
    });
});
