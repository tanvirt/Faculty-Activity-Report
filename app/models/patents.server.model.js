'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

var validateDate = function(p) {
	return validator.isDate(p);
};

var Patents = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
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
		//unique: 'testing error message'
	},

	date: {
		type: String,
		validate: [validateDate, 'Must be a valid date \"mm/dd/yyyy\"']
	},

	description: {
		type: String
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection:'Patents'});

mongoose.model('Patents', Patents);
