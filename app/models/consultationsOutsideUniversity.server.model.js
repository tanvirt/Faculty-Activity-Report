'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var validateLocalStrategyProperty = function(property) {
    return (property.length > 0);
};

var consultationsOutsideUniversity = new Schema({

    consultation: { //default input is N/A
        type: String,
        default: 'N/A',
        required: true,
        validate: [validateLocalStrategyProperty,
            'If no value is specified, please input "N/A"']
    },
    
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection: 'consultationsOutsideUniversity'});

mongoose.model('consultationsOutsideUniversity', consultationsOutsideUniversity);
