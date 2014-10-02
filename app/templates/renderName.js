'use strict';

var mongoose = require('mongoose');
var swig = require('swig');
var fs = require('fs');

var Name = mongoose.model('NameSchema');

var path = require('path');
var join = path.join;


function createDummyName() {
	var obj = new Name({
		firstName: 'Rosie',
		midInit: 'T',
		lastName: 'Poodle'
	});

	obj.save();
	return obj;
}


function latexString(obj, fileName) {
	return swig.renderFile(join('./app/templates', fileName), {
		firstName: obj.firstName,
		midInit: obj.midInit,
		lastName: obj.lastName
	});
}


exports.render = function( cb ) {
	Name.findOne({}, function(err, obj) {
		if (err) return err;

		if (!obj) {
			obj = createDummyName();
		}

		cb( latexString(obj, 'name.tex') );
	});
};