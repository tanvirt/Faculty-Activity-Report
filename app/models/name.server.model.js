'use strict';

var mongoose = require('mongoose'),
 db = mongoose.createConnection('localhost', 'namedb');
var Schema = mongoose.Schema;

var validateInitLength= function(property) {
	return (property.length == 1 || property.length == 0);
};

db.once('open', function() {	
	var nameSchema = new Schema({
	
		firstName: {
			type: String,
			required: true
		},
		
		midInit: {
			type: String,
			validate: [validateInitLength, 'Middle Initial can only be one letter']
		},
		
		lastName: {
			type: String,
			required: true
		}		
		
	}, {collection: 'namelist'});

	var Name = db.model('Name', nameSchema);
	
	var me = new Name({firstName: 'Morgan', midInit: 'K', lastName: 'Wheeler'});
	me.save();
		
});