'use strict';

var app = require('../../../../server');

var should = require('should');

var	teachingAdvising = require('../../../controllers/teachingAdvising/teachingAdvising');
//var section7 = require('../../../../public/modules/reports/views/section-7');

var mongoose = require('mongoose');
var TeachingAdvising = mongoose.model('TeachingAdvising');

var User = mongoose.model('User');
var Report = mongoose.model('Report');

var async = require('async');

var user, report;

describe('TeachingAdvising integration tests', function() {
  	var textBox = element(by.model('section7'));
  	var saveButton = element(by.id('advisingSave'));
 	var latestResult = element(by.binding('latest'));
  	var history = element.all(by.repeater('result in memory'));

  	beforeEach(function(done) {

		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		user.save();

		report = new Report({
			reportName: 'MyReportName',
			user: user
		});

		report.save();

		browser.get('http://localhost:3000/#!/reports/' + report.id + '/edit');
		
		done();
	});

  	it('should be able to submit an update to teachingAdvising section and show it in the report preview', function() {
  		var info = 'This is my teaching advising';
    	textBox.sendKeys(info);
    	saveButton.click();

    	expect(report.teachingAdvising.info.toEqual('This is my teaching advising'));
    	//browser.get('http://localhost:3000/#!/reports/' + report.id);
  	});
});