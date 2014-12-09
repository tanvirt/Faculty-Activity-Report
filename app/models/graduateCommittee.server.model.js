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

var graduateCommittee = new Schema({
	user: {			
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
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
		'Date must be less than or equal to the current year and greater than or equal to 1980']
	}
}, {collection:'GraduateCommittee'});

graduateCommittee.methods.getMonth = function() {
	return this.degreeDate.getMonth() + 1;
};

mongoose.model('GraduateCommittee', graduateCommittee);
