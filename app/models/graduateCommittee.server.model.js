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
	degreeDate: {
		type: Date 
	}
}, {collection:'GraduateCommittee'});

mongoose.model('GraduateCommittee', graduateCommittee);
