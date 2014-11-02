'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');
	
var validateDate = function(p) {
	return validator.isDate(p);
};	
	
var contract = new Schema({
	title: {
		type: String,
		required: true
	},
	funded: {
		type: String,
		enum: ['externally', 'internally', 'pending', 'not'],
		default: 'externally',
		required: true
	},

	PI: {
		type: String,
		enum: ['PI', 'co-PI', 'N/A']
	},
	startDate: {
		type: String,
		validate: [validateDate, 'Must be a valid date \"mm/dd/yyyy\"']
	},
	endDate: {
		type: String,
		validate: [validateDate, 'Must be a valid date \"mm/dd/yyyy\"']
	},
	fundingAgency: {
		type: String,
		required: true
	},
	fundingPortion: Number,
	value: {
		type: Number,
		required: true
	}	
});

//Contents of schema will pull majority of content from outside data source, not from user
//Overall mean is to be calculated on demand, not stored
var Contracts = new Schema({
	user: {			//multiple evaluations per user possible. Use this field to match with user
		type: Schema.ObjectId,
		ref: 'User'
	},
	sub: [contract],
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}	
}, {collection:'Contracts'});

mongoose.model('Contracts', Contracts);