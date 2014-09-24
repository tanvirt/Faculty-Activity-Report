'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return property >= 0 && property <= 100 && 
		this.teaching + this.research + this.service === 100;
};

/**
 * A Validation function for local date properties
 */
var validateLocalStrategyDate = function(property) {
	return new Date().getFullYear() >= property && 1980 <= property;
};

var AssignedActivity = new Schema({
	_id: {
		type: Schema.ObjectId,
		unique: true,
		required: true
	},
	year: {
		type: Number,
		required: true,
		validate: [validateLocalStrategyDate, 
					'Date must be less than or equal to the current year and greator than or equal to 1980']
	},
	semester: {
		type: String,
		enum: ['spring', 'fall', 'summer'],
		required: true
	},
	teaching: {
		type: Number,
		index: 1,
		default: 0,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	research: {
		type: Number,
		index: 2,
		default: 0,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	service: {
		type: Number,
		index: 3,
		default: 0,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	}	
}, {collection:'AssignedActivity'});

mongoose.model('AssignedActivity', AssignedActivity);