'use strict'

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly');
module.exports = db;