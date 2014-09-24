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
	//Figure out how to tranverse the child schema and check total schema size
};

/**
* A Validation function for local date properties
*/
var validateLocalStrategyDate = function(property) {
	return new Date().getFullYear() >= property && 1980 <= property;
};

//Child schema to hold the mean scores for each question
var meanScore = new Schema({ mean: {type: Number, default: 0}});

//Contents of schema will pull majority of content from outside data source, not from user
var teachingEvaluation = new Schema({
	_id: {
		type: Schema.ObjectId,
		unique: true,
		required: true
	},
	teacher: {			//multiple evaluations per teacher possible. Use this field to match with user.username
		type: String
		required: true
	},
	course: {
		type: String,
		required: true,
	},
	required: {
		type: String,
		enum: ['Yes', 'No'],
		default: 'No',
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
	enrolled: {
		type: Number,
		required: true,
	},
	highScore: {
		type: Number,
		default: 5,
	}
	lowScore: {
		type: Number,
		default: 1,
	}
	responses: {
		type: Number,
		required: true,
	}
	teacherMean: {	
		type: [meanScore],
		required: true,
		validate: [validateLocalStrategyMean, 'Numbers in collection must be between highScore and lowScore; total amount of numbers equal number of questions (10)']
	}
	departmentMean: {
		type: [meanScore],
		required: true,
		validate: [validateLocalStrategyMean, 'Numbers in collection must be between highScore and lowScore; total amount of numbers equal number of questions (10)']
	}
	collegeMean: {
		type: [meanScore],
		required: true,
		validate: [validateLocalStrategyMean, 'Numbers in collection must be between highScore and lowScore; total amount of numbers equal number of questions (10)']
	}
	
	
	
	
	
}, {collection:'teachingEvaluationsy'});

mongoose.model('teachingEvaluation', teachingEvaluation);