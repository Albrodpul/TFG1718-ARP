var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require("cors");
var MongoClient = require('mongodb').MongoClient;
var mdbURL = "mongodb://test:test@ds159344.mlab.com:59344/tfg1718-arp";
var BASE_API_PATH = "/api/v1/spain-births";
var db;
var port = (process.env.PORT || 11000);
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env' == 'development')) {
    app.listen(11000, function () {
        console.log('Magic happens on port: 11000!');
    });
}
else {
    app.listen(8080, function () {
        console.log('Example listening on port 8080!');
    });
}
module.exports = app;