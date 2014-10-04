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
	year: {
		type: Number,
		required: true,
		validate: [validateLocalStrategyDate, 
					'Date must be less than or equal to the current year and greator than or equal to 1980']
	},
	fall: {
		teaching: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		},
		research: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		},
		service: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
			}
	},
		
	spring: {
		teaching: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		},
		research: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		},
		service: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		}		
	},
		
	summer: {
		teaching: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		},
		research: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		},
		service: {
			type: Number,
			validate: [validateLocalStrategyProperty, 
					'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
		}
	}	
}, {collection:'AssignedActivity'});

mongoose.model('AssignedActivity', AssignedActivity);
