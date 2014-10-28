 'use strict';

/*
class that takes care of rendering the swig/debugging
@param MongooseModel, an instance of a mongoose model
@renderFilePath, the path of the latex file you want to render
@naFilePath, the path of the latex file you want to display
	when model.find returns empty (nothing in the collection for that user)
*/
function RenderModel( MongooseModel, renderFilePath, naFilePath ) {
	this.Model = MongooseModel;
	this.renderFilePath = renderFilePath;
	this.naFilePath = naFilePath;

	this.isDebugPopulate = false;
	this.debugJSON = null;

	this.isDebugNull = false;
}

/*
Sets the debugging on for populating the pdf with dummy data, (if defined)
@param isDebugPopulate, true/false value if you want to render the dummy data
@param debugJSON, a json object that explicitly defines the values you want to render 
*/
RenderModel.prototype.setDebugPopulate = function( isDebugPopulate, debugJSON ) {
	this.isDebugPopulate = isDebugPopulate;
	this.debugJSON = debugJSON;
};

/*
Finds one document for the current user's report.
@param req, the request field
@param cb, a callback function that contains the object returned
*/
RenderModel.prototype.findOneModelByReport = function( req, cb ) {
	//Model.findOne returns an object, so assign to findObj
	this.Model.findOne({report: req.report}, function(err, obj) {
		//if (err) return err;
		cb( err, obj );
	});
};

/*
Finds many documents for the current user's report
@param req, the request field
@param arrayToObj, a callback that allows to rearrange the array returned 
	by model.find. Contains the arrayOfObjs as a parameter
@param cb, a callback function that contains the single object
*/
RenderModel.prototype.findModelsByReport = function ( req, arrayToObj, cb ) {
	//Model.find returns an array of objects! so reorganize into
	//one object and assign
	this.Model.find({report: req.report}, function(err, arrayOfObjs) {
		//if (err) return err;

		var single_obj = arrayToObj( arrayOfObjs );

		cb( err, single_obj );
	});
};

/*
Helper function that injects values into the latex.tex files
*/
function renderSwig( filePath, json, cb ) {
	require('swig').renderFile(require('path').join('./app/templates', filePath), json, function(err, output) {
		//if (err) return err;

		// Callback to report.server.controller.js submit
		// error must be past first, and then the output
		// from the render
		cb( err, output );
	});
}

/*
Renders the obj into latex as a callback.

if obj is not defined, then the null latex gets rendered

@param obj, the obj you would like swig to render
@param cb, a callback that is contains an err as
	the first parameter and the resulting latex output as the second
*/
RenderModel.prototype.render = function( obj, cb ) {
	if ( this.isDebugNull && this.isDebugPopulate ) {
		throw new Error('Error: isDebugPopulate and isDebugNull can not both be true.');
	}

	if (this.isDebugPopulate && this.debugJSON) {
		console.log('\'Debuggin Population\' on for ' + this.Model.modelName);
		renderSwig(this.renderFilePath, this.debugJSON, cb);
	} else if (this.isDebugNull || !obj) {
		console.log('\'Debuggin Null\' on for ' + this.Model.modelName);
		renderSwig(this.naFilePath, null, cb);
	} else {
		renderSwig(this.renderFilePath, obj, cb);
	}
};

// Export the function to the world
module.exports.RenderModel = RenderModel;