'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateInitLength= function(property) {
	return (property.length === 1) || (property.length === 0);
};

var NameSchema = new Schema({
	firstName: {
		type: String,
		required: 'Please fill first name',
		trim: true
	},
	
	middleName: {
		type: String,
		validate: [validateInitLength, 'Middle Initial can only be one letter or blank'],
		trim: true
	},
	
	lastName: {
		type: String,
		required: 'Please fill last name',
		trim: true
	},

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}	
}, {collection: 'Name'});

mongoose.model('Name', NameSchema);
