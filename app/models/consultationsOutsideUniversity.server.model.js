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
        //required: true,
        validate: [validateLocalStrategyProperty,
            'If no value is specified, please input "N/A"']
    }


}, {collection: 'consultationsOutsideUniversity'});

mongoose.model('consultationsOutsideUniversity', consultationsOutsideUniversity);
