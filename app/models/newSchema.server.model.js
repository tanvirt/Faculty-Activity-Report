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
	}
	
}, {collection: 'NewSchema'});

mongoose.model('NewSchema', NewSchema);
