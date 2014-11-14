'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var profile = new Schema({
	name: {
		type: Schema.Types.ObjectId, ref: 'Name'
	},

	tenure: {
		type: Schema.Types.ObjectId, ref: 'Tenure'
	},

	currentRank: {
		type: Schema.Types.ObjectId, ref: 'CurrentRank'
	},

	dateAppointed: {
		type: Schema.Types.ObjectId, ref: 'DateAppointed'
	},

	affiliateAppointments: {
		type: Schema.Types.ObjectId, ref: 'AffiliateAppointments'
	},
    
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	report: {
		type: Schema.ObjectId,
		ref: 'Report'
	}

}, {collection: 'Profile'});

mongoose.model('Profile', profile);
