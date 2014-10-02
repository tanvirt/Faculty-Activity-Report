'use strict';

var mongoose = require('mongoose');
var swig = require('swig');
var fs = require('fs');
var Tenure = mongoose.model('TenureSchema');

var path = require('path');
var join = path.join;


function createDummyTenure() {
	var obj =  new Tenure({
		tenure: 'Tenured'
	});

	obj.save();
	return obj;
}


function latexString(obj, fileName) {
	return swig.renderFile(join('./app/templates', fileName), {
		tenure: obj.tenure
	});
}

exports.render = function( cb ) {
	Tenure.findOne({}, function(err, obj) {
		if (err) return err;
		
		if (!obj) {
			obj = createDummyTenure();
		}

		cb( latexString(obj, 'tenure.tex') );
	});
};

