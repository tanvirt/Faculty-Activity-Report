'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var honors = new Schema({

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


}, {collection: 'honors'});

mongoose.model('honors', honors);
