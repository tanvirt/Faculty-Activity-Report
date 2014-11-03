'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validator = require('validator');

	
var validateDate = function(p) {
	return validator.isDate(p);
};	

	
var Publication = new Schema({
	title: {
		type: String,
		required: 'please fill in title'
	},
	
	authors: {
		type: [String],
		required: 'please list author(s)'
	},
	
	publicationInfo: {
		type: String,
	},
	
	section: {
		type: String,
		default: 'Book',
		enum: ['Books, Sole Author', 'Books, Co-authored', 'Books, Edited', 'Books, Contributor', 'Monographs', 'Refereed Publications'],
		required: 'please select an option',
	},
	
	subsection: {
		type: String
	},
	
	year: {
		type: Date,
		validate: [validateDate, 'Must be a valid date \"mm/dd/yyyy\"']
	}

}, {collection: 'Publication'});

mongoose.model('Publication', Publication);