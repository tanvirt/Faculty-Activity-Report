'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var honors = new Schema({

    info: {
        type: String,
        default: ''

    }


}, {collection: 'honors'});

mongoose.model('honors', honors);
