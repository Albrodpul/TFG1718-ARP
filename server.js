var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var app = express();
var cors = require("cors");
var port = (process.env.PORT || 8080);
var db = require('./db');
var spainBirths = require("./api/spain-births/spain-births.js");
//var api = require("./api/spain-births/spain-births-api.js");
var baseApiUrl = "/api/v1/spain-births";

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.get(baseApiUrl, spainBirths.get);
app.get(baseApiUrl+'/loadInitialData', spainBirths.loadInitialData);
app.delete(baseApiUrl, spainBirths.deleteAll);

app.get("/callback", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.get("/profile", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.get("/data", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.get("/restclient", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(port, () => {
  console.log("Magic happens on port: " + port);
});


app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security
app.use(cors());