'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for local date properties
 */
var validateLocalStrategyDate = function(property) {
	return new Date().getFullYear() >= property && 1980 <= property;
};

var requiredStr = function(str) {
	return str + ' is a required field.';
};

var AssignedActivity = new Schema({
	year: {
		type: Number,
		//required: true,
		validate: [validateLocalStrategyDate, 
					'Date must be less than or equal to the current year and greator than or equal to 1980']
	},
	springTeaching: {
		type: Number,
		//required: requiredStr('SpringTeaching'),
		//min: 0,
		//max: 100
	},
	springResearch: {
		type: Number,
		//required: requiredStr('SpringResearch'),
		//min: 0,
		//max: 100
	},
	springService: {
		type: Number,
		//required: requiredStr('SpringService'),
		//min: 0,
		//max: 100
	},
	fallTeaching: {
		type: Number,
		//required: requiredStr('FallTeaching'),
		//min: 0,
		//max: 100
	},
	fallResearch: {
		type: Number,
		//required: requiredStr('FallResearch'),
		//min: 0,
		//max: 100
	},
	fallService: {
		type: Number,
		//required: requiredStr('FallService'),
		//min: 0,
		//max: 100
	},
	summerTeaching: {
		type: Number,
		//required: requiredStr('SummerTeaching'),
		//min: 0,
		//max: 100
	},
	summerResearch: {
		type: Number,
		//required: requiredStr('SummerResearch'),
		//min: 0,
		//max: 100
	},
	summerService: {
		type: Number,
		//required: requiredStr('SummerService'),
		//min: 0,
		//max: 100
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


AssignedActivity.pre('save', function(next) {
	var err;

	if (this.springTeaching + this.springResearch + this.springService !== 100) {
		err = new Error('springTeaching + springResearch + springService Must Equal 100');
	}

	if (this.summerTeaching + this.summerResearch + this.summerService !== 100) {
		err = new Error('summerTeaching + summerResearch + summerService Must Equal 100');
	}

	if (this.fallTeaching + this.fallResearch + this.fallService !== 100) {
		err = new Error('fallTeaching + fallResearch + fallService Must Equal 100');
	}

	if (err) {
		next(err);
	} else {
		next();
	}
});

mongoose.model('AssignedActivity', AssignedActivity);
