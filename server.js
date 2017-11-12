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
app.use(cors());
app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.get(baseApiUrl, spainBirths.get);
app.get(baseApiUrl+'/loadInitialData', spainBirths.loadInitialData);
app.get(baseApiUrl+"/:region", spainBirths.getRegionOrYear);
app.get(baseApiUrl+"/:region/:year", spainBirths.getRegionYear);
app.post(baseApiUrl,spainBirths.post);
app.post(baseApiUrl+"/:region/:year",spainBirths.postRegion);
app.put(baseApiUrl,spainBirths.put);
app.put(baseApiUrl+"/:region",spainBirths.putRegion);
app.put(baseApiUrl+"/:year",spainBirths.putRegion);
app.put(baseApiUrl+"/:region/:year",spainBirths.putRegionYear);
app.delete(baseApiUrl+'/:region',spainBirths.deleteRegion);
app.delete(baseApiUrl+'/:region/:year',spainBirths.deleteRegionYear);
app.delete(baseApiUrl, spainBirths.deleteAll);

app.get("/callback", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.get("/profile", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.get("/data", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.get("/restclient", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(port, () => {
  console.log("Magic happens on port: " + port);
});


