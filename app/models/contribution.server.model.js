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

var Contribution = new Schema({
	info: {
		type: String,
		default: 'N/A'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}
}, {collection:'Contribution'});

mongoose.model('Contribution', Contribution);
