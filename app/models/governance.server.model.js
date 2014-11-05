'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Governance = new Schema({
	
	govStr: {
		type: String
	},
	
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection: Governance});

mongoose.model('Governance', Governance);