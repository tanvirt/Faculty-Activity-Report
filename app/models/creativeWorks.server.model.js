'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

var validateDate = function(p) {
	return validator.isDate(p);
};

var validateWebsite = function(p) {
	return validator.isURL(p);
};

var CreativeWorks = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		require: true
	},

	description: {
		type: String
	},

	website: {
		type: String,
		validate: [validateWebsite, 'Must be a valid website']
	},

	jointEfforts: {
		type: [String]
	},

	date: {
		type: String,
		validate: [validateDate, 'Must be a valid date \"mm/dd/yyyy\"']
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection:'CreativeWorks'});

mongoose.model('CreativeWorks', CreativeWorks);