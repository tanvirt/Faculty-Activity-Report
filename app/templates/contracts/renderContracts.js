'use strict';

var mongoose = require('mongoose');
var modelClass = require('../modelClass');

// Compile Schema into Model here
var Contracts = mongoose.model('Contracts');
var renderModel = new modelClass.RenderModel(Contracts, 'contracts/contracts.tex', 'contracts/na.tex');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
Populates the database with test data
*/
renderModel.setDebugPopulate(false, {
	//sub: [{
		title: 'Contract 1',
		funded: 'externally',
		PI: 'PI',
		startDate: '02/13/2000',
		endDate: '08/05/2019',
		fundingAgency: 'NASA',
		fundingPortion: 100000,
		value: 200000
	/*},
	{
		title: 'Contract 2',
		funded: 'externally',
		PI: 'co-PI',
		startDate: 'October 2001',
		endDate: 'December 2013',
		fundingAgency: 'YOU',
		fundingPortion: 5000,
		value: 1000
	},
	{
		title: 'Contract 3',
		funded: 'not',
		PI: 'co-PI',
		startDate: '09/02/1990',
		endDate: '12/18/2001',
		fundingAgency: 'N/A',
		value: 400
	}]*/
	// Methods Don't get called
});

renderModel.isDebugNull = false;

module.exports.render = function(req, callback) {
	renderModel.renderMultipleContracts(req, callback);
};


module.exports.submit = function(req, callback) {
	/*if (!req.body.contracts) return callback(null, null);

	var arr = [];
	var total = 0;
	for(var i=0; i<req.body.contracts.length; i++) {
		var path = req.body.contracts[i];
		var subdoc = {
			title: path.title,
			funded: path.funded,
			PI: path.PI,
			startDate: path.startDate,
			endDate: path.endDate,
			fundingAgency: path.fundingAgency,
			fundingPortion: path.fundingPortion,
			value: path.value
		};
		if(path.fundingPortion) {
			total+=path.fundingPortion;
		}
		arr.push(subdoc);
	}

	var contract = new Contracts({
		sub: arr,
		user: req.user,
		fundingTotal: total
	});
		
	contract.save(function(err) {
		callback(err, contract);
	});*/
	return callback(null, null);	
};

module.exports.createDefaultData = function(report, user, cb) {
	var contracts;

	for (var i=0; i<defaultData.contracts.length; i++) {
		var save = _.extend(defaultData.contracts[i], {
			report: report,
			user: user
		});

		contracts = new Contracts(save);
		contracts.save();
	}

	cb(null, contracts);
};

module.exports.createPrevious = function(report, user, prevId, cb) {
	renderModel.createPreviousMult(Contracts, {contracts: undefined}, report, user, prevId, cb);
};
