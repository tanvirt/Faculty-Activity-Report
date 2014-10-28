'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TeachingAdvising = new Schema({
	/*philosophy: {
		type: String,
		required: true
	},
	supervising: {
		type: String
	},*/
	info: {
		type: String,
		default: 'N/A'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}
}, {collection:'TeachingAdvising'});

mongoose.model('TeachingAdvising', TeachingAdvising);
