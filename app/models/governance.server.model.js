'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Governance = new Schema({
	
	subsection: {
		type: String,
		enum: ['Department Committee Memberships', 'Other'], //need more options for this one
		required: true
	},
	committee: {
		type: String,
		required: true
	}

}, {collection: Governance});

mongoose.model('Governance', Governance);