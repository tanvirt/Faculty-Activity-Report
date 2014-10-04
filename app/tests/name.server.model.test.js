'use strict';
//module dependencies
var should = require('should'),
	mongoose = require('mongoose'),
	Name = mongoose.model('NameSchema');

var name1, name2;

describe('Name Model Unit Tests:', function() {
	beforeEach(function(done) {
		name1 = new Name({
			firstName: 'First',
			midInit: 'I',
			lastName: 'Last'
		});
		
		name2 = new Name({
			firstName: 'First',
			midInit: 'I',
			lastName: 'Last'
		});
		done();
	});
	
	describe('Method Save', function() {
		it('should save without problems', function(done) {
			name1.save(done);
		});	
		
		it('should fail to save without a first name', function(done) {
			name1.firstName = '';
			return name1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save without a last name', function(done) {
			name1.lastName = '';
			return name1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with a midInit longer than 1 character', function(done) {
			name1.midInit = 'alsdj';
			return name1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should save normally without a middle name', function(done) {
			name1.midInit = '';
			name1.save(done);
		});	
		
	});

	afterEach(function(done) {
		Name.remove().exec();
		done();
	});
	
});
