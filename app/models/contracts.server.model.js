'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');
	
var validateDate = function(p) {
	return validator.isDate(p);
};	
	
var Contracts = new Schema({
	title: {
		type: String//,
		//required: true
	},
	funded: {
		type: String,
		enum: ['externally', 'internally', 'pending', 'not'],
		default: 'externally'//,
		//required: true
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
		type: String//,
		//required: true
	},
	fundingPortion: Number,
	value: {
		type: Number//,
		//required: true
	}

	
}, {collection: 'Contracts'});


mongoose.model('Contracts', Contracts);