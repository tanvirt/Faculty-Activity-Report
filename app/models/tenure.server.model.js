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
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}
}, {collection: 'Tenure'});

mongoose.model('Tenure', TenureSchema);


