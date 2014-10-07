'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');
	
var validateDate = function(p) {
	return validator.isDate(p);
};	
	
var Contracts = new Schema({
	title: {
		type: String,
		required: 'Please fill in title'
	},
	funded: {
		type: String,
		enum: ['externally', 'internally', 'pending', 'not'],
		default: 'externally',
		required: 'please select: externally, internally, pending, or not'
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
		required: 'please fill in your funding agency'
	},
	fundingPortion: Number,
	value: {
		type: Number,
		required: 'please fill in your funding portion'
	}

	
}, {collection: 'Contracts'});


mongoose.model('Contracts', Contracts);