/**
 * @module controllers/record
 */
const moment = require('moment');
const createError = require('http-errors');
const Models = require('./../models');

function isUndefined(val) {
    return val === undefined;
}
module.exports.fetchRecords = function(req, res, next) {
    let query = req.body || {};
    let { startDate, endDate, minCount, maxCount} = query;
    if (!moment(startDate, "YYYY-MM-DD").isValid()) {
        throw createError(400, `Invalid Start Date '${startDate}'`);
    }
    if (!moment(endDate, "YYYY-MM-DD").isValid()) {
        throw createError(400, `Invalid End Date '${endDate}'`);
    }
    if (isUndefined(minCount) || !Number.isInteger(minCount)) {
        throw createError(400, `Min Count should be integer`);
    }
    if (isUndefined(maxCount) || !Number.isInteger(maxCount)) {
        throw createError(400, `Max Count should be integer`);
    }
    let matchCriteria = { 
        $and: [
            {createdAt: { $gte: new Date(startDate)}},
            {createdAt: { $lte: new Date(endDate)}}
        ]
    };
    let filterCriteria = {
        $and: [
            {totalCount: {$gte: minCount}},
            {totalCount: {$lte: maxCount}}
        ]
    };

    Models.Record.aggregate([
        { 
            $match: matchCriteria
        },
        {
            $project: {
                _id: 0,
                key: "$key",
                createdAt: "$createdAt",
                totalCount: { $sum: "$counts" }
            }
        },
        {
            $match: filterCriteria 
        }
    ], function(err, result) {
        if (err) { return next(err); }
        res.json({
            code: 0,
            msg: 'Success',
            result: result
        });
    });
};








