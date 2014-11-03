'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var furtherInformationSection = new Schema({

    info: {
        type: String,
        default: ''

    },
    
	user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
        
    report: {
        type: Schema.ObjectId,
        ref: 'Report'
    }



}, {collection: 'furtherInformationSection'});

mongoose.model('furtherInformationSection', furtherInformationSection);
