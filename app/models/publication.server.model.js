'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

	
var validateDate = function(p) {
	return validator.isDate(p);
};	

	
var Publication = new Schema({
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

}, {collection: 'Publication'});

mongoose.model('Publication', Publication);