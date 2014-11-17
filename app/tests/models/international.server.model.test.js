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
		
		});
		done();
	});
	
	describe('Method Save', function() {
		it('should be able to save without problems if no activities given', function(done) {
			international.save();
			done();
		});
		it('should set activities to N/A if nothing given', function(done) {
			assert.equal(international.activities, 'N/A');
			done();
		});
		it('should be able to save without problems if activities is given', function(done) {
			international.activities = 'I went to some other countries';
			international.save();
			done();
		});
		
	});

	afterEach(function(done) {
		International.remove().exec();
		done();
	});
	
});