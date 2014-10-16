'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Publication = mongoose.model('Publication');

var pub1;
	
describe('Publication Model Unit Tests:', function() {
	beforeEach(function(done) {
		pub1 = new Publication({
			title: 'New',
			authors: ['Me', 'Myself', 'I', 'Not U'],
			publicationInfo: '1234',
			year: '10/07/2014',
			section: 'Books, Edited',
			subsection: 'blahblah'
		});
		
		
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems', function(done) {
			pub1.save();
			done();
		});
		
		it('should save normally without subsection', function(done) {
			pub1.subsection = '';
			pub1.save();
			done();
		});
		
		it('should fail to save without title', function(done) {
			pub1.title = '';
			return pub1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
		it('should fail to save without authors', function(done) {
			pub1.authors = [];
			return pub1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with an invalid date', function(done) {
			pub1.year = 'Just Yesterday';
			return pub1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save without section', function(done) {
			pub1.section = '';
			return pub1.save(function(err) {
				should.exist(err);
				done();
			}); 
		
		});
		
		it('should fail to save with improper section', function(done) {
			pub1.section = 'the coolest newspaper';
			return pub1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
	});
	afterEach(function(done) {
        Publication.remove().exec();
        done();
    });
});
