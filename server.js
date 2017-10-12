/* global __dirname */

var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var port = (process.env.PORT || 11000);

var MongoClient = require('mongodb').MongoClient;
var mdbURL = "mongodb://test:test@ds159344.mlab.com:59344/tfg1718-arp";
var BASE_API_PATH = "/api/v1/spain-births";
var db;
var spainBirths=require("./public/api/spain-births-api.js");


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

app.use('/', express.static(__dirname +  '/public'));

app.get('/callback', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

