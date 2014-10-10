'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateLocalStrategyCourses = function(property) {
	return property >= 0 && property <= 5;
};

var TeachingAdvisingCourses = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	evaluationNumber: {
		type: Number,
		required: true,
		validate: [validateLocalStrategyCourses, 
			'Number must be between or including 0 and 5']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}, {collection:'TeachingAdvisingCourses'});

mongoose.model('TeachingAdvisingCourses', TeachingAdvisingCourses);
