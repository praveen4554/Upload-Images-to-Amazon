'use strict'

var ObjectId = require('mongodb').ObjectID;
  var MongoClient = require('mongodb').MongoClient;
  var a=[];
var rand;
var shortid = require('shortid');
  var data=[];
var mlab = function(mongoose)
{
	var data=[];
	this.mongoose = mongoose;
			this.config = require('../config/config.js');
};

mlab.prototype.sendtomlab = function(newdata,callback)
{
	console.log("send function");
	var me= this;
  rand=shortid.generate();
  var query={"data":newdata,"rand":rand,created_date: new Date()}
	MongoClient.connect("mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly", function(err, db) {
    db.collection('data').insertOne(query,function(err, doc) {
       //console.log("got it");
        if(err) {
          throw err;
        }
        else{
        	//console.log(doc);          
          }
          db.close();
          });
        });

}
mlab.prototype.sendGaltomlab = function(newdata,callback)
{
  rand=shortid.generate();
  var query={"data":newdata,"rand":rand}
	MongoClient.connect("mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly", function(err, db) {
    db.collection('datagal').insertOne(query,function(err, doc) {
       //console.log("got it");
        if(err) {
          throw err;
        }
        else{
        	//console.log(doc);          
          }
          db.close();
          });
        });

}
mlab.prototype.updatelab=function(rand,newdata,createddate,callback){
  var query={"rand":rand};
  var query1={"data":newdata,"rand":rand,"created_date":createddate};
  MongoClient.connect("mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly", function(err, db) {
  db.collection('data').updateOne(query,query1,function(err, doc) {
    if(err) {
          throw err;
        }
        else{
          
      }
        db.close();
    });
});
}

mlab.prototype.updateimglab=function(rand,newdata,createddate,callback){
  var query={"rand":rand};
  var query1={"data":newdata,"rand":rand};
  MongoClient.connect("mongodb://indian:indian@ds039155.mongolab.com:39155/cashonly", function(err, db) {
  db.collection('datagal').updateOne(query,query1,function(err, doc) {
    if(err) {
          throw err;
        }
        else{
          
      }
        db.close();
    });
});
}
module.exports=mlab;