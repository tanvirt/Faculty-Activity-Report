'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Tenure = mongoose.model('Tenure'),
	_ = require('lodash');
	
	
//Create Tenure Report
exports.create = function(req, res) {
	var tenuredoc = new Tenure(req.body);

	tenuredoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tenuredoc);
		}
	});
};

//Show current report
exports.read = function(req, res) {
	res.jsonp(req.tenure);
};
	
//update tenure report
exports.update = function(req, res) {
	var tenuredoc = req.tenuredoc ;

	tenuredoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tenuredoc);
		}
	});
};

/**
 * Report middleware
 */
exports.reportByID = function(req, res, next, id) { 
	Tenure.findById(id).populate('user', 'displayName').exec(function(err, tenuredoc) {
		if (err) return next(err);
		if (! tenuredoc) return next(new Error('Failed to load Report ' + id));
		req.tenuredoc = tenuredoc ;
		next();
	});
};

/**
 * Report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.tenuredoc.id !== req.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

	
	