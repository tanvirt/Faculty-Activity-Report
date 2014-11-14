'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Patents = mongoose.model('Patents');

var patent1, patent2;
	
describe('Patents Model Unit Tests:', function() {
	beforeEach(function(done) {
		patent1 = new Patents({
			title: 'New',
			authors: ['Me', 'Myself', 'I'],
			patentNumber: '1234',
			date: '10/07/2014',
			description: 'I wrote this book thingy all by myself and it is mine and you cannot have it hahahahahahahaha'
		});

		patent2 = new Patents({
			title: 'Two',
			authors: ['One'],
			patentNumber: '55555',
			date: '02/13/1992',
			description: 'lalalalalala'
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
		
		it('should fail to save a patent with the same patent number', function(done) {
			patent1.patentNumber = '010101';
			patent1.save();
			patent2.patentNumber = '010101';
			return patent2.save(function(err) {
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
			patent1.date = 'yunno, that one day. It rained.';
			return patent1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
	});
	afterEach(function(done) {
        Patents.remove().exec();
        done();
    });
});
