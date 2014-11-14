'use strict';
//module dependencies
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	serviceToSchools = mongoose.model('ServiceToSchools');

var s;

describe('serviceToSchools Model Unit Tests:', function() {
	beforeEach(function(done) {
		s = new serviceToSchools({
			//service: 'I did stuff for the school'
		});
		done();
	});
	
	describe('Method Save', function() {
		it('should save without problems with nothing given', function(done) {
			s.save(done);
		});


		it('should set service to N/A if nothing given', function(done) {
			assert.equal(s.service, 'N/A');
			done();
		});	
		
		it('should save without problems when info is given', function(done) {
			s.service = 'I did service for the school. I am very saintly.';
			s.save(done);
		});
		
		
		/*it('should fail to save if the field is empty', function(done) {
            serviceToSchools.service = '';
            return serviceToSchools.save(function(err) {
                should.exist(err);
                done();
            });
        });*/
		
	});

	afterEach(function(done) {
		serviceToSchools.remove().exec();
		done();
	});
	
});
