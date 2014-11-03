'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

var validateDate = function(p) {
	return validator.isDate(p);
};

var pSub = new Schema({
	title: {
		type: String,
		required: 'please fill in title'
	},

	authors: {
		type: [String],
		required: 'please list author(s)'
	},

	patentNumber: {
		type: String,
		unique: 'testing error message'
	},

	date: {
		type: String,
		validate: [validateDate, 'Must be a valid date \"mm/dd/yyyy\"']
	},

	description: {
		type: String
	}
});

var Patents = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	sub: [pSub],
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection:'Patents'});

mongoose.model('Patents', Patents);
