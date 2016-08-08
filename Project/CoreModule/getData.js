'use strict'

var ObjectId = require('mongodb').ObjectID;
  var MongoClient = require('mongodb').MongoClient;
  var a=[];
  var data=[];
var mlab = function(mongoose)
{
	var data=[];
	this.mongoose = mongoose;
	this.config = require('../config/config.js');
};
