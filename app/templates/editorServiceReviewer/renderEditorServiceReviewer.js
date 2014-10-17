'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var EditorServiceReviewer = mongoose.model('EditorServiceReviewer');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		position: 'reviewer',
		object: 'My Diary'
	});

	objs[1] = new Model({
		position: 'service',
		object: 'Board of Cool'
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'ESRs': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('editorServiceReviewer/editorServiceReviewer.tex', EditorServiceReviewer, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
