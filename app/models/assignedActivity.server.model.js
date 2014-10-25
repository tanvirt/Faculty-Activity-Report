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
		(this.springTeaching + this.springResearch + this.springService === 100) || 
		(this.summerTeaching + this.summerResearch + this.summerService === 100) ||
		(this.fallTeaching + this.fallResearch + this.fallService === 100);
};

/**
 * A Validation function for local date properties
 */
var validateLocalStrategyDate = function(property) {
	return new Date().getFullYear() >= property && 1980 <= property;
};

var AssignedActivity = new Schema({
	/*
	year: {
		type: Number,
		required: true,
		validate: [validateLocalStrategyDate, 
					'Date must be less than or equal to the current year and greator than or equal to 1980']
	},
	semester: {
		type: String,
		required: true,
		enum: ['spring', 'fall', 'summer']
	},
	*/
	springTeaching: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	springResearch: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	springService: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	fallTeaching: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	fallResearch: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	fallService: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	summerTeaching: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	summerResearch: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	summerService: {
		type: Number,
		validate: [validateLocalStrategyProperty, 
				'Number must be between or inclusing 0-100 and teaching + research + service Must Equal 100']
	},
	
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}
		
}, {collection:'AssignedActivity'});

mongoose.model('assignedActivity', AssignedActivity);
