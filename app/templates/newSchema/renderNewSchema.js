'use strict';

var mongoose = require('mongoose');
var NewSchema = mongoose.model('NewSchema');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( NewSchema, 'newSchema/newSchema.tex', 'newSchema/na.tex');

var is = require('is-js');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	section: 'My Extra Section',
	desc: 'all this nonsense: blah blah blah blah~'
});

/*
will explicitly print the N/A latex
to the screen for debugging purposes
*/
renderModel.isDebugNull = false;

/*
render function that finds the obj in the database
and converts it into latex.

module.exports.render = function(req, callback) {
	renderModel.findOneModelByReport( req, function( obj ) {
		renderModel.render( obj, callback );
	});
};
*/
/*
//Exactly the same as the render above, but 
//uses the fidnModelsByReport, which returns
//an array of JSON objects
*/
module.exports.render = function(req, callback) {
	renderModel.findModelsByReport( req, function( arrayOfObjs ) {
		return arrayOfObjs[0];
	}, function( single_obj ) {
		renderModel.render( single_obj, callback );
	});
};


/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	if (is.empty(req.body)) return callback(null, null);

	var schem = new NewSchema({
		section: req.body.section,
		desc: req.body.desc,
		user: req.user
	});

	schem.save(function(err) {
		callback(null, schem);
	});
};

