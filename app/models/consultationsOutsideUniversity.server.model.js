'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var consultationsOutsideUniversity = new Schema({

    consultation: { //default input is N/A
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

}, {collection: 'ConsultationsOutsideUniversity'});

mongoose.model('ConsultationsOutsideUniversity', consultationsOutsideUniversity);
