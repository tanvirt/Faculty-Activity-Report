'use strict';
//Fails because fields were changed in model

var should = require('should'),
	mongoose = require('mongoose'),
	AssignedActivity = mongoose.model('AssignedActivity');

var activity01, activity02;

describe('Assigned Activity Model Unit Tests:', function() {
	beforeEach(function(done) {
		activity01 = new AssignedActivity({
			year: 2013,
			springTeaching: 30,
			springResearch: 30,
			springService: 40,

			fallTeaching: 30,
			fallResearch: 30,
			fallService: 40,

			summerTeaching: 30,
			summerResearch: 30,
			summerService: 40
		});

		done();
	});

	describe('Method Save', function() {

		it('should be able to save without problems', function(done) {
			activity01.save();
			done();
		});

		it('should fail to save a year that is beyond the present year', function(done) {
			activity01.year = 2015;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save a year that is below 1980', function(done) {
			activity01.year = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save springTeaching that is above 100', function(done) {
			activity01.springTeaching = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save springTeaching that is below 0', function(done) {
			activity01.springTeaching = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save summerTeaching that is above 100', function(done) {
			activity01.summerTeaching = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save summerTeaching that is below 0', function(done) {
			activity01.summerTeaching = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save fallTeaching that is above 100', function(done) {
			activity01.fallTeaching = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save fallTeaching that is below 0', function(done) {
			activity01.fallTeaching = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save springResearch that is above 100', function(done) {
			activity01.springResearch = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save springResearch that is below 0', function(done) {
			activity01.springResearch = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save summerResearch that is above 100', function(done) {
			activity01.summerResearch = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save summerResearch that is below 0', function(done) {
			activity01.summerResearch = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save fallResearch that is above 100', function(done) {
			activity01.fallResearch = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save fallResearch that is below 0', function(done) {
			activity01.fallResearch = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save springService that is above 100', function(done) {
			activity01.springService = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save springService that is below 0', function(done) {
			activity01.springService = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save summerService that is above 100', function(done) {
			activity01.summerService = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save summerService that is below 0', function(done) {
			activity01.summerService = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save fallService that is above 100', function(done) {
			activity01.fallService = 1975;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save fallService that is below 0', function(done) {
			activity01.fallService = -5;
			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not fail to save springTeaching that is exactly 0', function(done) {
			activity01.springTeaching = 0;
			activity01.springService = 50;
			activity01.springResearch = 50;
			activity01.save();
			done();
		});

		it('should not fail to save springTeaching that is exactly 100', function(done) {
			activity01.springTeaching = 100;
			activity01.springService = 0;
			activity01.springResearch = 0;
			activity01.save();
			done();
		});

		it('should fail to save if spring teaching, research and service don\'t add up to 100', function(done) {
			activity01.springTeaching = 10;
			activity01.springService = 20;
			activity01.springResearch = 5;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if summer teaching, research and service don\'t add up to 100', function(done) {
			activity01.summerTeaching = 10;
			activity01.summerService = 20;
			activity01.summerResearch = 5;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if fall teaching, research and service don\'t add up to 100', function(done) {
			activity01.fallTeaching = 10;
			activity01.fallService = 20;
			activity01.fallResearch = 5;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if springTeaching is undefined', function(done) {
			activity01.springTeaching = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if springService is undefined', function(done) {
			activity01.springService = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if springResearch is undefined', function(done) {
			activity01.springResearch = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if fallTeaching is undefined', function(done) {
			activity01.fallTeaching = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if fallService is undefined', function(done) {
			activity01.fallService = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if fallResearch is undefined', function(done) {
			activity01.fallResearch = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if summerTeaching is undefined', function(done) {
			activity01.summerTeaching = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if summerService is undefined', function(done) {
			activity01.summerService = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save if summerResearch is undefined', function(done) {
			activity01.summerResearch = undefined;

			return activity01.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) {
		AssignedActivity.remove().exec();
		done();
	});
});

