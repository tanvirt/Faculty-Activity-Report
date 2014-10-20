'use strict';
//module dependencies
var should = require('should'),
	mongoose = require('mongoose'),
	International = mongoose.model('International');

var international;

describe('International Model Unit Tests:', function() {
	beforeEach(function(done) {
		international = new International({
			activities: 'I did stuff in other countries'
		});
		done();
	});
	
	describe('Method Save', function() {
		it('should save without problems', function(done) {
			international.save(done);
		});	
		
		it('should fail to save if the field is empty', function(done) {
            international.activities = '';
            return international.save(function(err) {
                should.exist(err);
                done();
            });
        });
		
	});

	afterEach(function(done) {
		International.remove().exec();
		done();
	});
	
});
