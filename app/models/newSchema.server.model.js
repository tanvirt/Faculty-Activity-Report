'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NewSchema = new Schema({
	section: {
		type: String,
		required: 'please title your section'
	},
	
	desc: {
		type: String,
		required: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}
	
}, {collection: 'NewSchema'});

mongoose.model('NewSchema', NewSchema);
