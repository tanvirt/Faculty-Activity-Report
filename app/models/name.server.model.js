'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateInitLength= function(property) {
	return (property.length === 1) || (property.length === 0);
};

var Name = new Schema({

	firstName: {
		type: String,
		required: true
	},
	
	midInit: {
		type: String,
		validate: [validateInitLength, 'Middle Initial can only be one letter or blank']
	},
	
	lastName: {
		type: String,
		required: true
	}		
	
}, {collection: 'Name'});

mongoose.model('Name', Name);