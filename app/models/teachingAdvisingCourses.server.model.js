'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateLocalStrategyCourses = function(property) {
	return property >= 0 && property <= 5;
};

var Courses = new Schema({
	body: {
		type: String
	},
	evaluationNumber: {
		type: Number,
		validate: [validateLocalStrategyCourses, 
			'Number must be between or including 0 and 5']
	}
}, {collection:'Courses'});

mongoose.model('Courses', Courses);
