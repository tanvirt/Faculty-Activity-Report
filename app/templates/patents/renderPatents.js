'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Patents = mongoose.model('Patents');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		title: 'Best Work Ever',
		authors: ['Me', 'Myself', 'I'],
		patentNumber: '020103',
		date: '10/08/1994',
		description: 'I wrote this work all by myself so you can\'t have it and I will take all the moneys and not you hahahahahahahahaha'
	});

	objs[1] = new Model({
		title: 'Sequel',
		authors: ['Me', 'You', 'Zeffron'],
		patentNumber: '11111',
		date: '04/16/2003',
		description: 'We\'re All In This Together'
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'patents': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('patents/patents.tex', Patents, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
