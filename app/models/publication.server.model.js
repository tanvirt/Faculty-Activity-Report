'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var Publication = new Schema({
	info: {
		type: String,
		default: 'N/A'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection: 'Publication'});

mongoose.model('Publication', Publication);