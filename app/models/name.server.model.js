'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateInitLength = function(property) {
	return (!property) || (property.length === 1) ;
};

var NameSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: 'Please fill first name'
	},
	
	middleName: {
		type: String,
		validate: [validateInitLength, 'Middle Initial can only be one letter or blank'],
		trim: true
	},
	
	lastName: {
		type: String,
		trim: true,
		required: 'Please fill last name'
	},

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}	
}, {collection: 'Name'});

mongoose.model('Name', NameSchema);
