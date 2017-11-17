var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
var spainBirths = require("./api/spain-births/spain-births.js");
var baseApiUrl = "/api/v1/spain-births";
var path = require('path');

module.exports = router;

app.use(bodyParser.json());

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

router.get("/callback", function (req, res) {
    res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

router.get("/profile", function (req, res) {
    res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

router.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

router.get("/data", function (req, res) {
    res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

router.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

router.get("/restclient", function (req, res) {
    res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

router.get(baseApiUrl, spainBirths.get);
router.get(baseApiUrl+'/loadInitialData', spainBirths.loadInitialData);
router.get(baseApiUrl+"/:region", spainBirths.getRegionOrYear);
router.get(baseApiUrl+"/:region/:year", spainBirths.getRegionYear);
router.post("/upload",spainBirths.postFiles);
router.post(baseApiUrl,spainBirths.post);
router.post(baseApiUrl+"/:region",spainBirths.postRegion)
router.post(baseApiUrl+"/:region/:year",spainBirths.postRegionYear);
router.put(baseApiUrl,spainBirths.put);
router.put(baseApiUrl+"/:region",spainBirths.putRegion);
router.put(baseApiUrl+"/:year",spainBirths.putRegion);
router.put(baseApiUrl+"/:region/:year",spainBirths.putRegionYear);
router.delete(baseApiUrl+'/:region',spainBirths.deleteRegion);
router.delete(baseApiUrl+'/:region/:year',spainBirths.deleteRegionYear);
router.delete(baseApiUrl, spainBirths.deleteAll);