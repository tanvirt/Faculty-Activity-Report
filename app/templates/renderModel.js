'use strict';

/*
DEPRECIATED DON'T USE THIS CODE IN NEWER VERSIONS,
	ONLY HERE FOR BACKWARD COMPATABILITY. USE modelClass.js

DEPRECIATED DON'T USE THIS CODE IN NEWER VERSIONS,
	ONLY HERE FOR BACKWARD COMPATABILITY. USE modelClass.js

DEPRECIATED DON'T USE THIS CODE IN NEWER VERSIONS,
	ONLY HERE FOR BACKWARD COMPATABILITY. USE modelClass.js
*/

var swig = require('swig');
var path = require('path');
var join = path.join;

/*
Helper function to populate Mongo with Data
@Param objectFunction a function that returns an object
@Model a compiled schema
*/
function createDummy( objectFunction, Model ) {	
	if ( typeof objectFunction === 'function' ) {
		var obj = objectFunction(Model);
		obj.save();
		return obj;
	} 
	throw new Error('Function passed did not define a new Mongoose Model!');
}

function createDummys( arrayObjectFunction, Model, cb ) {	
	var objA = arrayObjectFunction(Model);
	for (var i = 0; i < objA.length; i++) {
		objA[i].save();
	}
	cb(objA);
}

/*
Helper function that both query's and gets an object from the database 
and renders the object into latex.
@Param filePath the path of the .tex file in the templates directory. ex 'name/name.tex'
@Param Model a compiled Mongoose Schema
@Param dummyFunction a function that returns an object. If null, it throws an error if there
does not exist an entry in the collection.
@Param cb a callback function that sends a string of LaTex
*/
exports.render = function( filePath, Model, dummyFunction, cb ) {
	Model.findOne({}, function(err, obj) {
		if (err) return err;

		if (!obj) {
			if (dummyFunction) {
				obj = createDummy(dummyFunction, Model);
			} else {
				var errStr = 'There does not exist an entry in the ' + Model.modelName + ' collection.';
				throw new Error(errStr);
			}
		}

		swig.renderFile(join('./app/templates', filePath), obj, function(err, output) {
			if (err) throw err;
			cb( output );
		});
	});
};

function renderSwig(filePath, objArray, cb) {
	swig.renderFile(join('./app/templates', filePath), objArray, function(err, output) {
		if (err) throw err;
		cb( output );
	});
}

exports.renderUser = function( req, filePath, Model, dummyFunction, cb ) {
	Model.find({report: req.report}, function(err, obj) {
		if (err) return err;

		if (!obj[0]) {
			if (dummyFunction) {
				// if the parameter is not null, then assign fake data
				obj[0] = createDummy(dummyFunction, Model);
			} else {
				// render N/A to the screen
				filePath = 'name/na.tex';
			}
		}

		// inject values into latex
		renderSwig(filePath, obj[0], cb);
	});
};

exports.renderMultiple = function( filePath, Model, criteria, passObj, arrayDummyFunction, cb ) {
	Model.find(criteria, function(err, objArray) {
		if (err) return err;

		if (objArray.length === 0) {
			if (arrayDummyFunction) {
				createDummys(arrayDummyFunction, Model, function(objArray) {
					objArray = passObj(objArray);
					renderSwig(filePath, objArray, cb);
				});
			} else {
				var errStr = 'There does not exist an entry in the ' + Model.modelName + ' collection.';
				throw new Error(errStr);
			}
		} else {
			objArray = passObj(objArray);
			renderSwig(filePath, objArray, cb);
		}
	});
};