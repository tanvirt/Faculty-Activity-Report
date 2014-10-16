'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* var validateLocalStrategyDateMonth = function(property) {
 var d = new Date();
 var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 var n = d.getMonth(); // gets int for current month
 var monthID = month.indexOf(property); // gets int to represent month entered, 0 for January
 return monthID  <= n;
 }; */

var validateLocalStrategyDate = function(property) {
    return new Date().getFullYear() >= property && 1900 <= property;
};

var DateAppointed = new Schema({

    /*month: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        required: true,
        /*validate: [validateLocalStrategyDateMonth,
         'Date must be less than or equal to the current month'] 
    },
    year: {
        type: Number,
        required: true,
        validate: [validateLocalStrategyDate,
            'Date must be less than or equal to the current year and greater than or equal to 1900']
    }
	*/
	theDate: {
		type: Date,
		required: true
	}

}, {collection: 'DateAppointed'});

mongoose.model('DateAppointed', DateAppointed);
