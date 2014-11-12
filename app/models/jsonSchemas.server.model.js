'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jsonSchemas = new Schema({
	json: {
		type: String,
		required: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}, {collection: 'JSONSchemas'});

mongoose.model('JSONSchemas', jsonSchemas);
