'use strict';

//model dependencies
var mongoose = require('mongoose'),
 db = mongoose.createConnection('localhost', 'NTdb');
var Schema = mongoose.Schema;

db.once('open', function() {	
	var tenureSchema = new Schema({
		
		name: String,
		
		tenure: {
			type: String,
			enum: ['Tenured', 'Not Tenured'],
			required: true
		}
	}, {collection: 'namelist'});

	var Tenure = mongoose.model('Tenure', tenureSchema);
	
	var D = new Tenure({name: 'D', tenure : 'Tenured'});
	D.save();
	
	
});
