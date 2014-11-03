'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var validateLocalStrategyProperty = function(property) {
    return (property.length > 0);
};

var affiliateAppointments = new Schema({

    app: { //default input is None
        type: String,
        default: 'None',
        required: true,
        validate: [validateLocalStrategyProperty,
            'If no value is specified, please input "None"']
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection: 'affiliateAppointments'});

mongoose.model('affiliateAppointments', affiliateAppointments);
