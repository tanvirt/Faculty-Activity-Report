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
	if(property.length !== 9)
		return false;
	for(var i = 0; i < 9; i++)
	{
		if((property[i] < this.lowScore) || (property[i] > this.highScore))
			return false;
	}
	
	return true;
};

/**
* A Validation function for local date properties
*/

var validateLocalStrategyDate = function(property) {
	return new Date().getFullYear() >= property && 1980 <= property;
};


var section = new Schema({
	course: {
		type: String//,
		//required: true
	},
	required: {
		type: Boolean,
		default: false
	},
	year: {
		type: Number,
		//required: true,
		min: 1980,
		max: new Date().getFullYear()
	},
	semester: {
		type: String,
		enum: ['spring', 'fall', 'summer']//,
		//required: true
	},
	enrolled: {
		type: Number//,
		//required: true,
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
		type: Number//,
		//required: true,
	},
	teacherMean: {	
		type: [Number],
		//required: true,
		default: [1, 1, 1, 
				  1, 1, 1, 
				  1, 1, 1],
		validate: [validateLocalStrategyMean, 'Array Length must equal number of questions (9)']
	},
	departmentMean: {
		type: [Number],
		//required: true,
		default: [1, 1, 1, 
				  1, 1, 1, 
				  1, 1, 1],
		validate: [validateLocalStrategyMean, 'Array Length must equal number of questions (9)']
	},
	collegeMean: {
		type: [Number],
		//required: true,
		default: [1, 1, 1, 
				  1, 1, 1, 
				  1, 1, 1],
		validate: [validateLocalStrategyMean, 'Array Length must equal number of questions (9)']
	}
});

section.methods.findTotalMean = function findTotalMean() {
	var totalArr = [0,0,0];
	for(var i = 0; i < 9; i++) {
		totalArr[0] += this.teacherMean[i];
		totalArr[1] += this.departmentMean[i];
		totalArr[2] += this.collegeMean[i];
	}
	for(i = 0; i < 3; i++) totalArr[i] = (Math.round((totalArr[i]/9)*100))/100;
	return totalArr;
};

//Contents of schema will pull majority of content from outside data source, not from user
//Overall mean is to be calculated on demand, not stored
var teachingEvaluation = new Schema({
	user: {			//multiple evaluations per user possible. Use this field to match with user
		type: Schema.ObjectId,
		ref: 'User'
	},
	sub: [section],
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}	
}, {collection:'TeachingEvaluation'});

mongoose.model('TeachingEvaluation', teachingEvaluation);
