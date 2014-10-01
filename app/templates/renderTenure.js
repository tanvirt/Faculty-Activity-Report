'use strict';

var mongoose = require('mongoose');
var swig = require('swig');
var fs = require('fs');

var Tenure = mongoose.model('TenureSchema');

exports.render = function() {
	// Define a temporary object
	var object;

	Tenure.find({}, function(err,tenure) {
		if (err) return err;
		// store tenure in that object
		object = tenure;
	});

	// if object is NULL, write UNKNOWN
	if (!object) object = 'UNKNOWN';

	// return the rendered latex string
	return swig.renderFile('./app/templates/tenure.tex', {
		tenure: object
	});
};