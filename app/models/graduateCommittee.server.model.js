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
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	},
	totalCount: {
		type: Number,
		default: 0
	},
	chairCount: {
		type: Number,
		default: 0
	},
	coChairCount: {
		type: Number,
		default: 0
	},
	externalMemberCount: {
		type: Number,
		default: 0
	},
	memberCount: {
		type: Number,
		default: 0
	},
	minorCount: {
		type: Number,
		default: 0
	}	
}, {collection:'GraduateCommittee'});

graduateCommittee.methods.incrementCount = function( index ) {
	this.totalCount = this.totalCount + 1;

	switch (this.sub[index].role) {
		case 'Chair':
			this.chairCount++;
			break;
		case 'Co-Chair':
			this.coChairCount++;
			break;
		case 'External':
			this.externalMemberCount++;
			break;
		case 'Member':
			this.memberCount++;
			break;
		case 'Minor':
			this.minorCount++;
			break;
		default:
			throw new Error('Role is not defined in method incrementCount');
	}
};

graduateCommittee.methods.getMonth = function() {
	return this.degreeDate.getMonth() + 1;
};

mongoose.model('GraduateCommittee', graduateCommittee);
