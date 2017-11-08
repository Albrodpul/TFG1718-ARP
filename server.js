const path = require('path');
const express = require('express');
const app = express();
const cors=require("cors");
const port = (process.env.PORT || 8080);
const MongoClient = require('mongodb').MongoClient;
const mdbURL = "mongodb://test:test@ds159344.mlab.com:59344/tfg1718-arp";
const BASE_API_PATH = "/api/v1/spain-births";
const db;
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
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

app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security
app.use(cors());