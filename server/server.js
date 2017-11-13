var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var helmet = require("helmet");
var app = express();
var cors = require("cors");
var port = (process.env.PORT || 8080);
var routes = require("./routes.js");
var mongoose = require('mongoose');


app.use(cors()); // allow Cross-Origin Resource Sharing 
app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/../dist'));

// For all GET requests, send back index.html
app.use("/",routes);

// Connect to MongoDB using Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds159344.mlab.com:59344/tfg1718-arp',{ useMongoClient: true });
console.log('Mongoose and MongoDB are connected');

// Start the app by listening on the default
// Heroku port
app.listen(port, () => {
  console.log("Magic happens on port: " + port);
});


