'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	report = require('../../../app/controllers/report');
	var fs = require('fs');
	

/**
 * Globals
 */
 var fileCreated = false;
/*
describe('Report Controller Tests:', function() {
	beforeEach(function(done) {

		done();
	});

	describe('Method Generate', function() {
		
		it('should successfully execute given normal parameters - TEST IS NOT FUNCTIONAL', function(done) {
			var req = {report: {_id: 'debug', Name:{firstName: 'Ace', middleName: 'B', lastName: 'Denton'}}}; //This needs to be corrected
			this.timeout(10000);
	
			report.generate(req, {}, function(){
				fileCreated = true;
				
				//Will have error if pdf was not created successfully
				fs.readFile('./public/modules/reports/pdf/' + req.report._id + '.pdf', function(err, data){
					should.not.exist(err);
					done();
				});
			});
		});
		
		it('should catch and show a 500 error code on null req', function(done) {
			this.timeout(10000);
		
			report.generate({},{
				status: function(data) { 
				expect(data).to.equal(500);
				done();
			}}, function(){});
		});	
			
		it('should catch and show a 500 error code on blank req.report._id', function(done) {
			var req = {report: {_id: ''}};
			this.timeout(10000);
		
			report.generate(req,{
				status: function(data) { 
				expect(data).to.equal(500);
				done();
			}}, function(){});
		});
	});
	
	describe('Method Submit', function() {
		it('should successfully execute given normal parameters (TEST NOT IMPLEMENTED)', function(done) {
			done();
		});
	});

	afterEach(function(done) {
		if(fileCreated) //Unlink deletes file
			fs.unlinkSync('./public/modules/reports/pdf/debug.pdf');
		fileCreated = false;
		done(); 
	});
});
*/