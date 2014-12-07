'use strict';

browser.driver.get('http://localhost:3000/dropDatabase');

describe('FAR homepage', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000/#!/');

    expect(browser.getTitle()).toEqual('UF Faculty Activity Report - Development Environment');
  });
});

describe('FAR signup', function() {
	it('should be able to sign up for an account', function() {
		browser.get('http://localhost:3000/#!/signup');

		element(by.model('credentials.firstName')).sendKeys('test');
		element(by.model('credentials.lastName')).sendKeys('test');
		element(by.model('credentials.email')).sendKeys('test@test.com');
		element(by.model('credentials.username')).sendKeys('username');
		element(by.model('credentials.password')).sendKeys('password');

		element(by.id('signup')).click();

		expect(browser.getLocationAbsUrl()).toEqual('http://localhost:3000/#!/');
	});
});

describe('Create a New Report', function() {
	it('should be able to name a report and populate with default data', function() {
		browser.get('http://localhost:3000/#!/reports/create');

		element(by.model('reportName')).sendKeys('test');

		element(by.id('default')).click();

		expect(browser.getLocationAbsUrl()).toNotEqual('http://localhost:3000/#!/reports/create');
	});
});

describe('AssignedActivity', function() {
	it('should navigate to AssignedActivity nav-bar', function() {
		element(by.id('2')).click();
		
		element(by.model('springTeaching')).sendKeys(30);
		element(by.model('springResearch')).sendKeys(30);
		element(by.model('springService')).sendKeys(40);

		element(by.model('summerTeaching')).sendKeys(30);
		element(by.model('summerResearch')).sendKeys(30);
		element(by.model('summerService')).sendKeys(40);

		element(by.model('fallTeaching')).sendKeys(30);
		element(by.model('fallResearch')).sendKeys(30);
		element(by.model('fallService')).sendKeys(40);
	});
});

describe('Profile', function() {
	it('should navigate to profile nav-bar', function() {
		element(by.id('1')).click();


	});
});