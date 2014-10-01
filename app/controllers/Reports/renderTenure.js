'use strict';

var mongoose = require('mongoose');
var swig = require('swig');
var fs = require('fs');

exports.render = function(){
	var Tenure = mongoose.model('Tenure');
	Tenure.find({}, function(err,tenure) {
		return swig.renderFile('tenure.tex', {
			tenure: tenure
		}), function(err) {
			if(err) throw err;
			console.log('SAVED.');
		};
	});
};