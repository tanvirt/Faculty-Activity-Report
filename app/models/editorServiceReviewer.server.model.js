'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EditorServiceReviewer = new Schema({
	
	position: {
		type: String,
		enum: ['editor', 'service', 'reviewer'],
		required: true
	},
	object: {
		type: String,
		required: true
	}

}, {collection: EditorServiceReviewer});

mongoose.model('EditorServiceReviewer', EditorServiceReviewer);