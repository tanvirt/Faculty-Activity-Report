'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

var validateWebsite = function(p) {
	return validator.isURL(p);
};

/**
 * Checks that citations numbers are greater than or equal to zero
 */
var validateLocalStrategyProperty = function(property) {
	return property >= 0;
};

var Contribution = new Schema({
	intro: {
		type: String,
		required: true
	},
	examples: {
		title: {
			type: String,
			default: ''
		},
		body: {
			type: String,
			required: true
		}
	},
	conclusion: {
		type: String
	},
	works: {
		title: {
			type: String,
			required: true
		},
		citations: {
			type: Number,
			required: true,
			validate: [validateLocalStrategyProperty,
					'Number must be greater than or equal to zero']
		}
	},
	totalCitations: {
		type: Number,
		required: true
	},
	h_index: {
		type: Number,
		required: true
	},
	i_index: {
		type: Number,
		required: true
	},
	website: {
		type: String,
		validate: [validateWebsite, 'Must be a valid website']
	}
}, {collection:'Contribution'});

mongoose.model('Contribution', Contribution);
