'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TeachingAdvising = new Schema({
	philosophy: {
		type: String,
		required: true
	},
	supervising: {
		type: String
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}, {collection:'TeachingAdvising'});

mongoose.model('TeachingAdvising', TeachingAdvising);
