'use strict';

var mongoose = require('mongoose');
var Name = mongoose.model('Name');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Name, 'name/name.tex', 'name/na.tex');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	firstName: 'Rosie',
	middleName: 'T',
	lastName: 'Poodle'
});

/*
will explicitely print the N/A latex
to the screen for debugging purposes
*/
renderModel.isDebugNull = false;

/*
render function that finds the obj in the database
and converts it into latex.
*/
module.exports.render = function(req, callback) {
	if(!renderModel.isDebugNull && !renderModel.isDebugPopulate) {
		renderModel.findOneModelByReport( req, function( err, obj ) {
			if (err) throw err;
			renderModel.render( obj, callback );
		});
	}
	else
		renderModel.render({}, callback);
};

/*
//Exactly the same as the render above, but 
//uses the fidnModelsByReport, which returns
//an array of JSON objects
module.exports.render = function(req, callback) {
	renderModel.findModelsByReport( req, function( arrayOfObjs ) {
		return arrayOfObjs[0];
	}, function( single_obj ) {
		renderModel.render( single_obj, callback );
	});
};
*/

/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	var name = new Name({
		firstName: req.body.firstName,
		middleName: req.body.middleName,
		lastName: req.body.lastName,
		user: req.user
	});

	name.save(function(err) {
		callback(null, name);
	});
};

