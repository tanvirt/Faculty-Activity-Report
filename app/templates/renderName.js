'use strict';

//var mongoose = require('mongoose');
var swig = require('swig');

var path = require('path');
var join = path.join;

function dummyObject(Model) {
	var obj = new Model({
		firstName: 'Rosie',
		midInit: 'T',
		lastName: 'Poodle'
	});
	return obj;
}

function swigTemplate(obj) {
	var retObj = {
		firstName: obj.firstName,
		midInit: obj.midInit,
		lastName: obj.lastName
	};
	return retObj;
}

function createDummy( objectFunction, Model ) {	
	if ( typeof objectFunction === 'function' ) {
		var obj = objectFunction(Model);
		obj.save();
		return obj;
	} 
	throw new Error('Function passed did not define a new Mongoose Model!');
}

function latexString( texFileName, objectFunction, obj ) {
	if (typeof objectFunction === 'function') {
		return swig.renderFile(join('./app/templates', texFileName), objectFunction(obj));
	}
	throw new Error('Function passed did not define an swig Object!');
}


exports.render = function( texFileName, Model, cb ) {
	Model.findOne({}, function(err, obj) {
		if (err) return err;

		if (!obj) {
			obj = createDummy(dummyObject, Model);
		}

		cb( latexString( texFileName, swigTemplate, obj ) );
	});
};