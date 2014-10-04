'use strict';

//model dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TenureSchema = new Schema({
	//user:
	tenure: {
		type: String,
		enum: ['Tenured', 'Not Tenured'],
		required: true
	}
}, {collection: 'TenureSchema'});

mongoose.model('TenureSchema', TenureSchema);


