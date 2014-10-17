'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	EditorServiceReviewer = mongoose.model('EditorServiceReviewer');

var esr1;
	
describe('EditorServiceReviewer Model Unit Tests:', function() {
	beforeEach(function(done) {
		esr1 = new EditorServiceReviewer({
			position: 'reviewer',
			object: 'the PokeDex'
		});
				
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems', function(done) {
			esr1.save();
			done();
		});
		
		it('should fail to save without position', function(done) {
			esr1.position = '';
			return esr1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
		it('should fail to save without object', function(done) {
			esr1.object = '';
			return esr1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with invalid position', function(done) {
			esr1.position = 'King';
			return esr1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});
	afterEach(function(done) {
        EditorServiceReviewer.remove().exec();
        done();
    });
});
