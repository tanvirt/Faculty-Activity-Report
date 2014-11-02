'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Report Schema
 */
var ReportSchema = new Schema({
	reportName: {
		type: String,
		default: '',
		required: 'Please fill Report name',
		trim: true
	},

	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	//TEMPORARY FIELDS FOR REPORT SECTIONS------------------------------------------------
	/*
	firstName: {
		type: String,
		default: '',
		required: 'Please fill first name',
		trim: true
	},
	middleName: {
		type: String,
		default: '',
		required: 'Please fill middle name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please fill last name',
		trim: true
	},


	tenure: {
		type: String,
		default: 'Not Tenured',
		enum: ['Tenured', 'Not Tenured'],
		trim: true
	},
	*/



	name: {
		type: Schema.Types.ObjectId, ref: 'Name'
	},

	tenure: {
		type: Schema.Types.ObjectId, ref: 'Tenure'
	},

	currentRank: {
		type: Schema.Types.ObjectId, ref: 'currentRank'
	},

	dateAppointed: {
		type: Schema.Types.ObjectId, ref: 'DateAppointed'
	},

	affiliateAppointments: {
		type: Schema.Types.ObjectId, ref: 'affiliateAppointments'
	},

	teachingAdvising: {
		type: Schema.Types.ObjectId, ref: 'TeachingAdvising'
	},

	contribution: {
		type: Schema.Types.ObjectId, ref: 'Contribution'
	},

	international: {
		type: Schema.Types.ObjectId, ref: 'International'
	},

	membership: {
		type: Schema.Types.ObjectId, ref: 'Membership'
	},

	teachingEvaluation: {
		type: Schema.Types.ObjectId, ref: 'TeachingEvaluation'
	},
	
	conferences: {
		type: Schema.Types.ObjectId, ref: 'Conferences'
	}


//END TEMP-------------------------------------------------




});

mongoose.model('Report', ReportSchema);