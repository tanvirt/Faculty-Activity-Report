'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var furtherInformationSection = new Schema({

    info: {
        type: String,
        default: ''

    }


}, {collection: 'furtherInformationSection'});

mongoose.model('furtherInformationSection', furtherInformationSection);
