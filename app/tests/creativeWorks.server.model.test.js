'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	CreativeWorks = mongoose.model('CreativeWorks');

/**
 * Globals
 */

var work01;

describe('Creative Works Model Unit Tests:', function() {
	beforeEach(function(done) {

		work01 = new CreativeWorks({
			name: 'Google',
			description: 'Take Over the World!',
			website: 'www.google.com',
			date: '10/23/2000'
		});

		work01.jointEfforts.push('George', 'Gandalf', 'Rebecca');
		done();
	});

	describe('Method Save', function() {

		it('should be able to save without problem', function(done) {
			work01.save();
			done();
		});

		it('should fail to save with an invalid date', function(done) {
			work01.date = 'NotADate';

			return work01.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save an invalid url', function(done) {
			work01.website = 'NotAWeb';

			return work01.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	describe('Field Array jointEfforts', function() {
		it('should be of length 3', function(done) {
			work01.jointEfforts.should.have.length(3);
			done();
		});
	});

	afterEach(function(done) {
		CreativeWorks.remove().exec();
		done();
	});
});