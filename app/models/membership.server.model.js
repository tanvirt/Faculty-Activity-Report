'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateLocalStrategyCourses = function(property) {
	return property <= 2014 && property >= 1900;
};

var Membership = new Schema({
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

}, {collection:'Membership'});

mongoose.model('Membership', Membership);