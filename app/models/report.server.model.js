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
	
	assignedActivity: {
		type: Schema.Types.ObjectId, ref: 'AssignedActivity'
	}


//END TEMP-------------------------------------------------




});

mongoose.model('Report', ReportSchema);