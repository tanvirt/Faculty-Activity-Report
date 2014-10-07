'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Patents = mongoose.model('Patents');

var patent1;
	
describe('Patents Model Unit Tests:', function() {
	beforeEach(function(done) {
		patent1 = new Patents({
			title: 'New',
			authors: ['Me', 'Myself', 'I'],
			patentNumber: 1234,
			date: '10/07/2014',
			description: 'I wrote this book thingy all by myself and it is mine and you cannot have it hahahahahahahaha'
		});		
		
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems', function(done) {
			patent1.save();
			done();
		});
		
		it('should fail to save without title', function(done) {
			patent1.title = '';
			return patent1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save without authors', function(done) {
			patent1.authors = [];
			return patent1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with an invalid date', function(done) {
			patent1.date = 'Just Yesterday';
			return patent1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
	});

});
