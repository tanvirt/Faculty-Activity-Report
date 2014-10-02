'use strict';

var mongoose = require('mongoose');
var swig = require('swig');
var fs = require('fs');

var Name = mongoose.model('NameSchema');

exports.render = function() {
	// Define a temporary object
	var object1, object2, object3;
//there's got to be a better way than this. Especially for the larger schemas. Ew.

	Name.find({}, function(err,firstName,midInit,lastName) {
		if (err) return err;
		// store firstName, midInit, and lastName in that object
		object1 = firstName;
		object2 = midInit;
		object3 = lastName;
	});

	// if object is NULL, write UNKNOWN
	if (!object1) object1 = 'UNKNOWN';
	if (!object2) object2 = '';
	if (!object3) object3 = 'UNKNOWN';

	// return the rendered latex string
	return swig.renderFile('./app/templates/name.tex', {
		firstName: object1,
		midInit: object2,
		lastName: object3
	});
};