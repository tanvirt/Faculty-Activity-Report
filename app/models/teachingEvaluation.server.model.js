'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for local mean properties
 */
var validateLocalStrategyMean = function(property) {
	if (!property) {
		return true;
	}

	if (property.length !== 10) {
		return false;
	}

	for (var i=0; i<property.length; i++) {
		if (property[i] < 1 || property[i] > 5) {
			return false;
		}
	}
	
	
	return true;
};

/**
* A Validation function for local date properties
*/

var validateLocalStrategyDate = function(property) {
	return !property || new Date().getFullYear() >= property && 1980 <= property;
};


//Contents of schema will pull majority of content from outside data source, not from user
//Overall mean is to be calculated on demand, not stored
var teachingEvaluation = new Schema({
	user: {			//multiple evaluations per user possible. Use this field to match with user
		type: Schema.ObjectId,
		ref: 'User'
	},
	course: {
		type: String
	},
	required: {
		type: Boolean
	},
	year: {
		type: Number,
		min: 1980,
		max: new Date().getFullYear()
	},
	semester: {
		type: String,
		enum: ['spring', 'fall', 'summer'],
		default: 'spring'
	},
	enrolled: {
		type: Number,
	},
	highScore: {
		type: Number,
		default: 5,
	},
	lowScore: {
		type: Number,
		default: 1,
	},
	responses: {
		type: Number,
	},
	teacherMean: {	
		type: [Number],
		default: [1, 1, 1, 
				  1, 1, 1, 
				  1, 1, 1, 1]//,
		//validate: [validateLocalStrategyMean, 'Array Length must equal number of questions (10)']
	},
	departmentMean: {
		type: [Number],
		default: [1, 1, 1, 
				  1, 1, 1, 
				  1, 1, 1, 1]//,
		//validate: [validateLocalStrategyMean, 'Array Length must equal number of questions (10)']
	},
	collegeMean: {
		type: [Number],
		default: [1, 1, 1, 
				  1, 1, 1, 
				  1, 1, 1, 1]//,
		//validate: [validateLocalStrategyMean, 'Array Length must equal number of questions (10)']
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}	
}, {collection:'TeachingEvaluation'});

teachingEvaluation.methods.findTotalMean = function findTotalMean() {
	var totalArr = [0,0,0];
	for(var i = 0; i < 9; i++) {
		totalArr[0] += this.teacherMean[i];
		totalArr[1] += this.departmentMean[i];
		totalArr[2] += this.collegeMean[i];
	}
	for(i = 0; i < 3; i++) totalArr[i] = (Math.round((totalArr[i]/9)*100))/100;
	return totalArr;
};

mongoose.model('TeachingEvaluation', teachingEvaluation);
