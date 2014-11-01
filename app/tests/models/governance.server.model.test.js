'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Governance = mongoose.model('Governance');

var gov1;
	
describe('Governance Model Unit Tests:', function() {
	beforeEach(function(done) {
		gov1 = new Governance({
			subsection: 'Other',
			committee: 'member of the Kids Next Door club'
		});
				
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems', function(done) {
			gov1.save();
			done();
		});
		
		it('should fail to save without subsection', function(done) {
			gov1.subsection = '';
			return gov1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
		it('should fail to save without committee', function(done) {
			gov1.committee = '';
			return gov1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with invalid subsection', function(done) {
			gov1.subsection = 'COOL CLUBS IM IN';
			return gov1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});
	afterEach(function(done) {
        Governance.remove().exec();
        done();
    });
});
