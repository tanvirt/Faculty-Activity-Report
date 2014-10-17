'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Governance = mongoose.model('Governance');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		subsection: 'Other',
		committee: 'Big Kid Table'
	});

	objs[1] = new Model({
		subsection: 'Department Committee Memberships',
		committee: 'Adult Table'
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'govs': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('governance/governance.tex', Governance, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
