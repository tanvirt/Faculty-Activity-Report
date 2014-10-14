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

	firstName: {
		type: String,
		default: '',
		required: 'Please fill first name',
		trim: true
	},
	midInit: {
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

	currentRank: {
		type: String,
		default: 'None',
		required: 'Please fill current rank',
		trim: true
	},

	dateAppointed: {
		type: Date,
		required: 'Please fill date appointed',
		trim: true
	},

	affiliateAppointments: {
		type: String,
		default: 'None',
		trim: true
	},


//END TEMP-------------------------------------------------




});

mongoose.model('Report', ReportSchema);