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
	}
}, {collection:'TeachingAdvising'});

mongoose.model('TeachingAdvising', TeachingAdvising);
