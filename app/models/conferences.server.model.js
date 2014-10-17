'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conferences = new Schema({
	
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
	}

}, {collection: Conferences});

mongoose.model('Conferences', Conferences);