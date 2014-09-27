'use strict';

//model dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
	
	var tenureSchema = new Schema({
		tenure: {
			type: String,
			enum: ['Tenured', 'Not Tenured'],
			required: true
		}
	}, {collection: 'tenureSchema'});
	
	mongoose.model('tenureSchema',tenureSchema);

