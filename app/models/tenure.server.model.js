'use strict';

//model dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var Tenure = new Schema({

	_id: {
		type: Schema.ObjectId,
		unique: true,
		required: true
	},
	
	tenure: {
		type: String,
		enum: [Tenured, Not Tenured],
		required: true
	}
}, {collection: 'Tenure'});

mongoose.model('Tenure', Tenure);