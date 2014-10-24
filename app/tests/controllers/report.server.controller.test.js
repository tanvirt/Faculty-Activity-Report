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
 var standardRes = {
	render: function(){},
	status: function(status){varStatus = status; return this;},
	send: function(info){varInfo = info; return this;}, 
	varInfo: '0',
	varStatus: 0
 };
 var fileCreated = false;

describe('Report Controller Tests:', function() {
	beforeEach(function(done) {

		done();
	});

	describe('Method Generate', function() {
		
		it('should successfully execute given normal parameters', function(done) {
			var req = {report: {_id: 'debug'}};
			this.timeout(10000);
	
			report.generate(req, standardRes, function(){
				fileCreated = true;
				
				//Will have error if pdf was not created successfully
				fs.readFile('./public/modules/reports/pdf/' + req.report._id + '.pdf', function(err, data){
					should.not.exist(err);
					done();
				});
			});
		});
		
		it('should show an error code on missing report (TEST NOT IMPLEMENTED)', function(done) {
			//report.generate({}, standardRes, function(){});
			done();
		});	
			
		it('should handle a missing report id correctly (TEST NOT IMPLEMENTED)', function(done) {
			//report.generate({}, standardRes, function(){});
			done();
		});
	});
	
	describe('Method Submit', function() {
		it('should successfully execute given normal parameters (TEST NOT IMPLEMENTED)', function(done) {
			done();
		});
	});

	afterEach(function(done) {
		if(fileCreated)
			fs.unlinkSync('./public/modules/reports/pdf/debug.pdf')
		fileCreated = false;
		done(); 
	});
});
