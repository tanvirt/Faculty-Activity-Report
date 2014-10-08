'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Contracts = mongoose.model('Contracts');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		title: 'New Project',
		funded: 'externally',
		PI: 'PI',
		startDate: '02/13/2000',
		endDate: '08/05/2019',
		fundingAgency: 'NASA',
		fundingPortion: 100000,
		value: 200000
	});

	objs[1] = new Model({
		title: 'Lame Project',
		funded: 'not',
		PI: 'co-PI',
		startDate: '09/02/1990',
		endDate: '12/18/2001',
		fundingAgency: 'N/A',
		value: 4000
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	var total = 0;
	for(var i = 0; i != objArray.length; i++) {
		if(objArray[i].funded === 'externally') {
			total+=objArray[i].fundingPortion;
		}
	}

	return {'contracts': objArray, 'total': total};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('contracts/contracts.tex', Contracts, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
