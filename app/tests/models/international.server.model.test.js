'use strict';
//module dependencies
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	International = mongoose.model('International');

var international;

describe('International Model Unit Tests:', function() {
	beforeEach(function(done) {
		international = new International({
			//activities: 'I did stuff in other countries'
		});
		done();
	});
	
	describe('Method Save', function() {
		it('should save without problems', function(done) {
			international.save(done);
		});

		it('should set activities to N/A if nothing given', function(done) {
			assert.equal(international.activities, 'N/A');
			done();
		});	
		
	});

	afterEach(function(done) {
		International.remove().exec();
		done();
	});
	
});