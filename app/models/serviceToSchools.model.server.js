'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var validateLocalStrategyProperty = function(property) {
    return (property.length > 0);
};

*/

var serviceToSchools = new Schema({

    service: { 
        type: String
        //required: true,
       /* validate: [validateLocalStrategyProperty,
            'If no value is specified, please input "N/A"'] */
    },
    
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection: 'serviceToSchools'});

mongoose.model('serviceToSchools', serviceToSchools);
