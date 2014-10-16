'use strict';

var renderModel = require('../../../app/templates/renderModel');
var mongoose = require('mongoose');

// Compile Schema into Model here
var Publication = mongoose.model('Publication');

/*
Populates the database with test data
*/
function dummyObjects(Model) {
	var objs = [];
	
	objs[0] = new Model({
		title: 'Best Work Ever',
		authors: ['Me', 'Myself', 'I'],
		publicationInfo: '(nonsense that makes this MLA)',
		year: '10/08/1994',
		section: 'Books, Contributor',
		subsection: 'Cool Ones'
	});

	objs[1] = new Model({
		title: 'We\'re All In This Together',
		authors: ['Me', 'You', 'Zeffron'],
		PublicationInfo: '11111',
		year: '04/16/2003',
		section: 'Books, Edited',
		subsection: 'Cool Ones'
	});
	
	objs[2] = new Model({
		title: 'La Sequel',
		authors: ['One', 'Two'],
		PublicationInfo: 'abd-22',
		year: 'August 1990',
		section: 'Books, Co-authored'
	});

	return objs;
}

/*
rearrange data, pass in additional fields
*/
function passObj(objArray) {
	return {'publications': objArray};
}

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(callback) {
	renderModel.renderMultiple('publication/publication.tex', Publication, {}, passObj, dummyObjects, function ( renderStr ) {
		callback(null, renderStr);
	});
};
