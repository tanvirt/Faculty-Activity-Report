'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

/**
* Checks that website is valid
*/
var validateWebsite = function(p) {
	return validator.isURL(p);
};

/**
 * Checks that numbers are greater than or equal to zero
 */
var validateNumbers = function(property) {
	return property >= 0;
};

/**
* Checks that length of string does not exceed 500 words

var validateStringLength500 = function(property) {
	return (property.length <= 500);
};

/**
* Checks that length of string does not exceed 250 words

var validateStringLength250 = function(property) {
	return (property.length <= 250);
};

/**
* Checks that length of titles does not exceed 50 words

var validateTitleLength = function(property) {
	return (property.length <= 50);
};
*/
var Contribution = new Schema({
	intro: {
		type: String,
		required: true
	},
	examples: {
		title: {
			type: String
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
			validate: [validateNumbers,
					'Number must be greater than or equal to zero']
		}
	},
	totalCitations: {
		type: Number,
		required: true,
		validate: [validateNumbers,
					'Number must be greater than or equal to zero']
	},
	h_index: {
		type: Number,
		required: true,
		validate: [validateNumbers,
					'Number must be greater than or equal to zero']
	},
	i_index: {
		type: Number,
		required: true,
		validate: [validateNumbers,
					'Number must be greater than or equal to zero']
	},
	website: {
		type: String,
		validate: [validateWebsite, 'Must be a valid website']
	}
}, {collection:'Contribution'});

mongoose.model('Contribution', Contribution);
