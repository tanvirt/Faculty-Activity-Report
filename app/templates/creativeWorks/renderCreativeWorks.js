'use strict';

var mongoose = require('mongoose');
var modelClass = require('../modelClass');

// Compile Schema into Model here
var CreativeWorks = mongoose.model('CreativeWorks');
var renderModel = new modelClass.RenderModel(CreativeWorks, 'creativeWorks/creativeWorks.tex', 'creativeWorks/na.tex');

renderModel.setDebugPopulate(false, {
	sub: [{
		name: 'LaTeX',
		description: 'a high-quality typesetting system',
		website: 'http://www.latex-project.org',
		date: '10/20/1984',
		jointEfforts: ['George', 'Gandalf', 'Rebecca']
	},
	{
		name: 'Amazon',
		description: 'an American international electronic commerce company',
		website: 'http://www.amazon.com',
		date: '7/5/1994',
		jointEfforts: ['George', 'Balrog', 'Aeowen']
	},
	{
		name: 'Microsoft',
		description: 'an American multinational corporation ',
		website: 'http://www.microsoft.com/',
		date: '4/04/1975',
		jointEfforts: ['George', 'Gandalf', 'Rebecca', 'Aragorn']
	}]
});

renderModel.isDebugNull = false;

/*
rearrange data, pass in additional fields

function passObj(objArray) {
	return {'works': objArray, 'len':objArray.length};
}

*/

/*
Helper function that gets called in report.server.controller.js
Output is pushed into a LaTex PDF there.
*/
module.exports.render = function(req, callback) {
	renderModel.render(req, callback);
};

module.exports.submit = function(req, callback) {
	if (!req.body.creativeWorks) return callback(null, null);

	var creative = new CreativeWorks({
		sub: [],
		user: req.user
	});

	for (var i=0; i<req.body.creativeWorks.length; i++) {
		var path = req.body.creativeWorks[i];
		var subdoc = {
			name: path.name,
			description: path.description,
			website: path.website,
			jointEfforts: path.jointEfforts,
			date: path.date
		};

		creative.sub.push(subdoc);
	}

	creative.save(function(err) {
		callback(err, creative);
	});
};
