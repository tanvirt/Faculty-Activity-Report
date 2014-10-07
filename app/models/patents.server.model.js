'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

var validateDate = function(p) {
	return validator.isDate(p);
};	

	
var Patents = new Schema({
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
	
	description: String

}, {collection: 'Patents'});

mongoose.model('Patents', Patents);