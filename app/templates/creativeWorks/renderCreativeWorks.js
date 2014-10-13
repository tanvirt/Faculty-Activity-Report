'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var CreativeWorks = mongoose.model('CreativeWorks');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		name: 'LaTeX',
		description: 'a high-quality typesetting system',
		website: 'http://www.latex-project.org',
		date: '10/20/1984'
	});
	objs[0].jointEfforts.push('George', 'Gandalf', 'Rebecca');

	objs[1] = new Model({
		name: 'Amazon',
		description: 'an American international electronic commerce company',
		website: 'http://www.amazon.com',
		date: '7/5/1994'
	});
	objs[1].jointEfforts.push('George', 'Gandalf', 'Rebecca');

	objs[2] = new Model({
		name: 'Microsoft',
		description: 'an American multinational corporation ',
		website: 'http://www.microsoft.com/',
		date: '4/04/1975'
	});
	objs[2].jointEfforts.push('George', 'Gandalf', 'Rebecca', 'Aragorn');

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'works': objArray, 'len':objArray.length};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('creativeWorks/creativeWorks.tex', CreativeWorks, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
