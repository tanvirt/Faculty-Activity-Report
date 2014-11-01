'use strict';

var should = require('should');

var	mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var	modelClass = require('../../../templates/modelClass');

var renderModel1;

var TestSchema = new Schema({
	report: String,
	stringOne: {
		type: String,
		trim: true
	},
	stringTwo: {
		type: String,
		tim: true
	}
}, {collection: 'Test'});

var TestModel = mongoose.model('Test', TestSchema);

describe('ModelClass Controller Tests', function() {
	beforeEach(function(done) {

		renderModel1 = new modelClass.RenderModel( TestModel, '/test.tex', '/na.tex');

		renderModel1.renderFolderPath = './app/tests/controllers/modelClass';

		renderModel1.setDebugPopulate( false, {
			stringOne: 'Foo',
			stringTwo: 'Bar'
		});

		renderModel1.isDebugNull = false; //false by default, but written for clarity

		done();
	});

	describe('Method Tests', function() {
		describe('Render', function() {
			it('should not return an error', function(done) {
				renderModel1.render({report: 'myreportid'}, function(err, output) {
					should.not.exist(err);
					done();
				});
			});

			it('should return N/A output since schema is not saved yet', function(done) {
				renderModel1.render({report: 'myreportid'}, function(err, output) {
					should.not.exist(err);
					output.should.equal('\\section{TEST:} N/A');
					done();
				});
			});

			it('should return correct output when schema is saved and is pulled from database', function(done) {
				TestModel.create({
					report: 'myreportid',
					stringOne: 'Hello',
					stringTwo: 'Swig'
				}, function(err) {
					should.not.exist(err);

					renderModel1.render({report: 'myreportid'}, function(err, output) {
						should.not.exist(err);
						output.should.equal('\\section{TEST:} \\begin Hello : Swig \\end');
						done();
					});
				});
			});

			it('should return debug output when isDebugPopulate is set to true', function(done) {
				renderModel1.isDebugPopulate = true;

				renderModel1.render({report: 'myreportid'}, function(err, output) {
					should.not.exist(err);
					output.should.equal('\\section{TEST:} \\begin Foo : Bar \\end');
					done();
				});
			});

			it('should return debug output when isDebugPopulate is set to true even when stuff is saved to the database', function(done) {
				TestModel.create({
					report: 'myreportid',
					stringOne: 'Hello',
					stringTwo: 'Swig'
				}, function(err) {
					should.not.exist(err);

					renderModel1.isDebugPopulate = true;

					renderModel1.render({report: 'myreportid'}, function(err, output) {
						should.not.exist(err);
						output.should.equal('\\section{TEST:} \\begin Foo : Bar \\end');
						done();
					});
				});
			});	

			it('should return N/A when isDebugNull is set to true even when stuff is saved to the database', function(done) {
				TestModel.create({
					report: 'myreportid',
					stringOne: 'Hello',
					stringTwo: 'Swig'
				}, function(err) {
					should.not.exist(err);

					renderModel1.isDebugNull = true;

					renderModel1.render({report: 'myreportid'}, function(err, output) {
						should.not.exist(err);
						output.should.equal('\\section{TEST:} N/A');
						done();
					});
				});
			});
		});
	});

	afterEach(function(done) {
		TestModel.remove().exec();
		done();
	});
});