'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(property) {
    return (property.length > 0);
};

var International = new Schema({
	activities: {
		type: String,
		required: true,
		default: 'N/A',
		validate: [validateLocalStrategyProperty,
            'If no value is specified, please input "N/A"']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}	
}, {collection: 'International'});

mongoose.model('International', International);
