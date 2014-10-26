'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(property) {
    return (property.length > 0);
};

var International = new Schema({
	activities: {
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
}, {collection: 'International'});

mongoose.model('International', International);
