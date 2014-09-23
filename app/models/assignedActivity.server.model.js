'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AssignedActivity = new Schema({
	_id: {
		type: String
	},
	year: {
		type: Number
	},
	semester: {
		type: String,
		enum: ['spring', 'fall', 'summer']
	},
	teaching: {
		type: Number
	},
	research: {
		type: Number
	},
	service: {
		type: Number
	}	
});

mongoose.model('AssignedActivity', AssignedActivity);