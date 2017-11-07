'use strict'

var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var port = (process.env.PORT || 11000);
var cors=require("cors");
//var calls=require("./client/app/calls/calls.js");
var MongoClient = require('mongodb').MongoClient;
var mdbURL = "mongodb://test:test@ds159344.mlab.com:59344/tfg1718-arp";
var BASE_API_PATH = "/api/v1/spain-births";
var db;
var spainBirths=require("./api/spain-births/spain-births-api.js");
var apiPopulation  = require('./api/external-api/population.js');

MongoClient.connect(mdbURL,{native_parser:true},function(err,database){
  if(err){
    console.log("Cannot connect to DB: "+err);
    process.exit(1);
  }
  db=database.collection("spain-births");
  spainBirths.initial(app,db,BASE_API_PATH);
  app.listen(port, ()=>{
    console.log("Magic happens on port: " + port);
});
});


var app = express();
app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security
app.use(cors());
app.use('/', express.static(__dirname +  '/client/src'));
app.use('/1.0/population/Spain/18',apiPopulation);
//app.get('/callback', calls.getCallback);
//app.get('/profile', calls.getProfile);

