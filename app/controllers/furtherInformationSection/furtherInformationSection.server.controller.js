'use strict';
var mongoose = require('mongoose');
var FurtherInformationSection = mongoose.model('FurtherInformationSection');
var errorHandler = require('../errors');
var is = require('is-js');
var path = require('path');
var join = path.join;
var _ = require('lodash');
/*
 Gets the data from the frontend and
 saves it in the database.
 */
exports.create = function(req, res) {
    if (is.empty(req.body.furtherInformationSection)) {
        return res.jsonp({
            err: 'Post (create): Does not exist',
            message: 'req.body.furtherInformationSection did not get sent to backend',
            changes: 'No FurtherInformationSection Created'
        });
    }
    var furtherInformationSection = new FurtherInformationSection({
        info: req.body.furtherInformationSection.info,
        user: req.user,
        report: req.report
    });
    furtherInformationSection.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.report.furtherInformationSection = furtherInformationSection;
            req.report.save();
            res.jsonp(furtherInformationSection);
        }
    });
};
exports.update = function(req, res) {
    console.log(require('util').inspect(req.body));
    if (is.empty(req.body.furtherInformationSection)) {
        res.status(400);
        return res.jsonp({
            err: 'Put (update): Does not exist',
            message: 'req.body.furtherInformationSection did not get sent to backend',
            changes: 'No Changes Made'
        });
    }
    var furtherInformationSection = req.furtherInformationSection;
    furtherInformationSection = _.extend(furtherInformationSection, req.body.furtherInformationSection);
    furtherInformationSection.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(furtherInformationSection);
        }
    });
};
exports.readFromReport = function(req, res) {
    FurtherInformationSection.findOne({report: req.report}, function(err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        return res.jsonp(result);
    });
};
exports.read = function(req, res) {
    res.jsonp(req.furtherInformationSection);
};
exports.furtherInformationSectionById = function(req, res, next, id) {
    FurtherInformationSection.findById(id)
        .exec(function(err, furtherInformationSection) {
            if (err) return next(err);
            if (!furtherInformationSection) return next(new Error('Failed to load FurtherInformationSection ' + id));
            req.furtherInformationSection = furtherInformationSection;
            next();
        });
};
