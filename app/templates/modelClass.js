 'use strict';

var swig = require('swig');
var join = require('path').join;
var fs = require('fs');

var spawn = require('child_process').spawn;

/*
class that takes care of rendering the swig/debugging
@param MongooseModel, an instance of a mongoose model
@renderFilePath, the path of the latex file you want to render
@naFilePath, the path of the latex file you want to display
	when model.find returns empty (nothing in the collection for that user)
*/
function RenderModel( MongooseModel, renderFilePath, naFilePath ) {
	//private field
	this._Model = MongooseModel;

	//private field
	this._renderFilePath = renderFilePath;

	//private field
	this._naFilePath = naFilePath;

	//private field
	this._debugJSON = null; 

	//public field
	this.renderFolderPath = './app/templates'; //by default

	//public field
	this.isDebugPopulate = false;

	//public field
	this.isDebugNull = false; 
}

/*
Sets the debugging on for populating the pdf with dummy data, (if defined)
@param isDebugPopulate, true/false value if you want to render the dummy data
@param debugJSON, a json object that explicitly defines the values you want to render 
*/
RenderModel.prototype.setDebugPopulate = function( isDebugPopulate, debugJSON ) {
	this.isDebugPopulate = isDebugPopulate;
	this._debugJSON = ( new this._Model( debugJSON ) ).toJSON();
};

/*
PRIVATE METHOD

Finds one document for the current user's report.
@param req, the request field
@param cb, a callback function that contains the object returned
*/
RenderModel.prototype._findOneModelByReport = function( req, cb ) {
	//Model.findOne returns an object, so assign to findObj
	this._Model.findOne({report: req.report}, function(err, obj) {
		cb( err, obj );
	});
};

/*
PRIVATE METHOD

Finds many documents for the current user's report
@param req, the request field
@param arrayToObj, a callback that allows to rearrange the array returned 
	by model.find. Contains the arrayOfObjs as a parameter
@param cb, a callback function that contains the single object
*/
RenderModel.prototype._findModelsByReport = function ( req, cb ) {
	//Model.find returns an array of objects! so reorganize into
	//one object and assign
	this._Model.find({report: req.report}, function(err, arrayOfObjs) {

		

		if (err) return err;

		cb( err, arrayOfObjs );
	});
};

/*
Helper function that injects values into the latex.tex files
*/
function renderSwig( folderPath, filePath, json, cb ) {
	//console.log(require('util').inspect(json));
	swig.renderFile(join(folderPath, filePath), json, function(err, output) {
		/*
		if (err) {
			throw err;
		}
		*/
		// Callback to report.server.controller.js submit
		// error must be past first, and then the output
		// from the render
		cb( err, output );
	});
}

function renderLatex( modelName, id, folderPath, filePath, json, cb ) {
	var randNum = Math.floor((Math.random() * 300) + 100); //100 - 400
	var sectionHTML = modelName + '_id' + id + '_r' + randNum + '.html';
	var sectionLATEX = modelName + '_id' + id + '_r' + randNum + '.tex';

	fs.writeFile(join('./app/templates/html2latex_tmp/', sectionHTML), json.info, function(err) {
		if (err) return cb(err, '');

		var h2l = spawn('java', ['-jar', './htmltolatex-1.0.1/htmltolatex.jar', 
								'-config','./htmltolatex-1.0.1/config.xml',
								'-input', join('./app/templates/html2latex_tmp/', sectionHTML),
								'-output', join('./app/templates/html2latex_tmp/', sectionLATEX)]);

		h2l.stdout.on('data', function (data) {
  			console.log('stdout: ' + data);
		});
 		
		h2l.stderr.on('data', function (data) {
			console.log('stderr: ' + data);
		});
 		
		h2l.on('close', function (code) {
			fs.readFile(join('./app/templates/html2latex_tmp/', sectionLATEX), 'utf8', function(err, tex) {
				if (err) {
					console.log('there was an error 0: ' + err);
					return cb(err, '');
				}

				var converted = tex;

				fs.readFile(join(folderPath, filePath), 'utf8', function(err, data) {
					if (err) {
						console.log('there was an error 1: ' + err);
						return cb( err, '');
					}
					
					cb( null, data + converted);
				});				
			});
		});

	});
}

/*
PRIVATE METHOD

Renders the obj into latex as a callback.

if obj is not defined, then the null latex gets rendered

@param obj, the obj you would like swig to render
@param cb, a callback that contains an err as
	the first parameter and the resulting latex output as the second
*/
RenderModel.prototype._render = function( obj, cb ) {
	if ( this.isDebugNull && this.isDebugPopulate ) {
		throw new Error('Error: isDebugPopulate and isDebugNull can not both be true.');
	}

	//console.log(obj);

	if (this.isDebugPopulate && this._debugJSON) {
		//console.log('\'Debugging Population\' on for ' + this._Model.modelName);
		//console.log(require('util').inspect(this.debugJSON));
		//console.log(require('util').inspect(obj));
		renderSwig(this.renderFolderPath, this._renderFilePath, this._debugJSON, cb);
	} else if (this.isDebugNull || !obj) {
		//if (this.isDebugNull)
			//console.log('\'Debugging Null\' on for ' + this._Model.modelName);
		renderSwig(this.renderFolderPath, this._naFilePath, null, cb);
	} else {
		renderSwig(this.renderFolderPath,this._renderFilePath, obj, cb);
	}
};

RenderModel.prototype._renderMult = function( obj, cb ) {
	if ( this.isDebugNull && this.isDebugPopulate ) {
		throw new Error('Error: isDebugPopulate and isDebugNull can not both be true.');
	}

	//console.log(obj);

	if (this.isDebugPopulate && this._debugJSON) {
		//console.log('\'Debugging Population\' on for ' + this._Model.modelName);
		//console.log(require('util').inspect(this.debugJSON));
		//console.log(require('util').inspect(obj));
		renderSwig(this.renderFolderPath, this._renderFilePath, this._debugJSON, cb);
	} else if (this.isDebugNull || obj.array.length === 0) {
		//if (this.isDebugNull)
			//console.log('\'Debugging Null\' on for ' + this._Model.modelName);
		renderSwig(this.renderFolderPath, this._naFilePath, null, cb);
	} else {
		renderSwig(this.renderFolderPath, this._renderFilePath, obj, cb);
	}
};

RenderModel.prototype._renderHTML = function( obj, id, cb ) {
	if ( this.isDebugNull && this.isDebugPopulate ) {
		throw new Error('Error: isDebugPopulate and isDebugNull can not both be true.');
	}

	//console.log(obj);

	if (this.isDebugPopulate && this._debugJSON) {
		//console.log('\'Debugging Population\' on for ' + this._Model.modelName);
		//console.log(require('util').inspect(this.debugJSON));
		//console.log(require('util').inspect(obj));
		renderSwig(this.renderFolderPath, this._renderFilePath, this._debugJSON, cb);
	} else if (this.isDebugNull || !obj) {
		//if (this.isDebugNull)
			//console.log('\'Debugging Null\' on for ' + this._Model.modelName);
		renderSwig(this.renderFolderPath, this._naFilePath, null, cb);
	} else {
		renderLatex(this._Model.modelName, id, this.renderFolderPath, this._renderFilePath, obj, cb);
	}
};

RenderModel.prototype.render = function(req, callback) {
	var _this = this;

	_this._findOneModelByReport( req, function( err, obj ) {
		if (err) {
			callback(err, null);
		} else {
			_this._render( obj, callback );
		}
	});
};

RenderModel.prototype.renderMultipleGrad = function(req, callback, parseObj) {
	var _this = this;
	
	_this._findModelsByReport( req, function( err, arrayOfObjs ) {
		if (err) {
			callback(err, null);
		} else {
			_this._renderMult( parseObj( arrayOfObjs ), callback );
		}
	});
};

RenderModel.prototype.renderMultiple = function(req, callback) {
	var _this = this;
	
	_this._findModelsByReport( req, function( err, arrayOfObjs ) {
		if (err) {
			callback(err, null);
		} else {
			_this._renderMult( {array: arrayOfObjs}, callback );
		}
	});
};

RenderModel.prototype.renderHTML = function(req, callback) {
	var _this = this;

	_this._findOneModelByReport( req, function( err, obj ) {
		if (err) {
			callback(err, null);
		} else {
			_this._renderHTML( obj, req.report._id, callback );
		}
	});
};

RenderModel.prototype.createPrevious = function(Model, json, report, user, prevId, cb) {
	Model.findOne({report: prevId})
	.lean()
	.select('-_id')
	.select('-__v')
	.select('-report')
	.exec(function(err, result) {
		if (err) return cb(err, undefined);
		if (!result) {
			return cb(undefined, json);
		}

		var model = new Model(result);
		model.report = report;

		model.save(function(err) {
			cb(err, model);
		});
	});
};

RenderModel.prototype.createPreviousMult = function(Model, json, report, user, prevId, cb) {
	Model.find({report: prevId})
	.lean()
	.select('-_id')
	.select('-__v')
	.select('-report')
	.exec(function(err, result) {
		if (err) return cb(err, undefined);
		if (!result) {
			return cb(undefined, json);
		}

		var model;

		for (var i=0; i<result.length; i++) {
			model = new Model(result[i]);
			model.report = report;

			model.save();
		}

		cb(err, model);
	});
};

// Export the function to the world
module.exports.RenderModel = RenderModel;