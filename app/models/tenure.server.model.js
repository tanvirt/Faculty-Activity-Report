'use strict';

//model dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/* Fails Tests - Tenure doesn't load	*/
var TenureSchema = new Schema({
	tenure: {
		type: String,
		enum: ['Tenured', 'Not Tenured'],
		required: true
	}
}, {collection: 'TenureSchema'});

mongoose.model('TenureSchema', TenureSchema);


