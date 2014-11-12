'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EditorServiceReviewer = new Schema({
	
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

}, {collection: EditorServiceReviewer});

mongoose.model('EditorServiceReviewer', EditorServiceReviewer);