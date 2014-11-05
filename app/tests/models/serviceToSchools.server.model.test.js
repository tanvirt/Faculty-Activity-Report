'use strict';
//module dependencies
var should = require('should'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	serviceToSchools = mongoose.model('serviceToSchools');

var serviceToSchools;

describe('serviceToSchools Model Unit Tests:', function() {
	beforeEach(function(done) {
		serviceToSchools = new serviceToSchools({
			//service: 'I did stuff for the school'
		});
		done();
	});
	
	describe('Method Save', function() {
		it('should save without problems', function(done) {
			serviceToSchools.save(done);
		});

/*
		it('should set service to N/A if nothing given', function(done) {
			assert.equal(serviceToSchools.service, 'N/A');
			done();
		});	
*/		
		
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
