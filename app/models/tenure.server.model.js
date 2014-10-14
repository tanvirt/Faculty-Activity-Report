'use strict';

//model dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TenureSchema = new Schema({
	tenure: {
		type: String,
		default: 'Not Tenured',
		enum: ['Tenured', 'Not Tenured']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}	
}, {collection: 'TenureSchema'});

mongoose.model('TenureSchema', TenureSchema);


