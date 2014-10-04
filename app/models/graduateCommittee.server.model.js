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
	return new Date() >= property && 1980 <= property.getFullYear();
};

//The count of each role will be calculated on demand by using the MongoDB count command
var graduateCommittee = new Schema({

	teacher: {			//Use this field to match with user.username
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['Chair','Co-Chair','External','Member','Minor'],
		required: true
	},
	studentName: {
		type: String,
		required: true
	},
	degree: {
		type: String,
		enum: ['M.S.','Ph.D.'], //I have a feeling this will need to be expanded
		required: true
	},
	major: {
		type: String,
		required: true
	},
	degreeDate: {
		type: Date, 
		validate: [validateLocalStrategyDate, 
			'Date must be less than or equal to the current year and greator than or equal to 1980']
	}
}, {collection:'GraduateCommittee'});

mongoose.model('GraduateCommittee', graduateCommittee);
