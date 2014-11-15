'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Contents of schema will pull majority of content from outside data source, not from user
//Overall mean is to be calculated on demand, not stored
var Conferences = new Schema({
	user: {			//multiple evaluations per user possible. Use this field to match with user
		type: Schema.ObjectId,
		ref: 'User'
	},
	area: {
		type: String,
		enum: ['International', 'State', 'Local'],
		required: 'please select one'
	},
	presentation: {
		type: String,
		enum: ['Lecture', 'Speech', 'Poster']
	},
	title: {
		type: String,
		required: 'please fill in title'
	},
	date: {
		type: Date,
		required: true
	},
	where: {
		type: String,
		required: true
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}	
}, {collection:'Conferences'});

mongoose.model('Conferences', Conferences);