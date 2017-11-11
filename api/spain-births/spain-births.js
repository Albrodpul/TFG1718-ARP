require('mongoose').model('spain-births');
var functions = require("./functions");
var mongoose = require('mongoose');
var SpainBirths = mongoose.model('spain-births');
var csvjson = require('csvjson');
var csvFilePath = '/api/spain-births/spain-births.csv';
var path = require('path');
var fs = require("fs");
var baseApiUrl = "/api/v1/spain-births";
module.exports = {
    get: function (request, response, next) {
        var limit = request.query.limit;
        var offset = request.query.offset;
        var from = request.query.from;
        var to = request.query.to;
        var birth = [];
        SpainBirths.find({}, function (err, births) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                birth = functions.getListaFTLO(births, from, to, limit, offset);
                console.log("INFO: Sending contacts: " + JSON.stringify(birth, 2, null));
                response.send(birth);
            }
        });
    },

    loadInitialData: function (request, response) {
        console.log("INFO: New GET request to /loadInitialData");
        console.log('INFO: Initialiting DB...');
        console.log('INFO: Empty DB, loading initial data');
        SpainBirths.remove(function (err) {
            if (err) {
              response.end(err);            
            } else {
              response.end();
            }
          });
        var data = fs.readFileSync(path.join(__dirname, 'spain-births.csv'), { encoding: 'utf-8' });
        var options = {
            delimiter: ';' // optional 
        };
        var content = csvjson.toObject(data, options);
        console.log(content);
        content.forEach(function (element) {
            console.log("Contenido: "+element);
            new SpainBirths({
                region: element.region,
                year: Number(element.year),
                men: Number(element.men),
                women: Number(element.women),
                totalbirth: Number(element.totalbirth)
            }).save(function (err) {
                if (err) {
                    response.status(504);
                    response.end(err);
                } else {
                    console.log("INFO: Inserted"+element.region);
                    response.end();
                }
            });
            /*fs.readFile('./public/api/spain-births/spain-births.json', 'utf8', (err, content) => {
                if (err) throw err;
                var json = JSON.parse(content);
                console.log(json);
                db.insert(json, function(err, doc) {
                    if (err) throw err;
                });
            });*/
        });
    },
    deleteAll: function(request, response, next) {
        console.log("INFO: New DELETE request to /spain-births");
        SpainBirths.remove(function (err) {
          if (err) {
            response.end(err);            
          } else {
            response.end();
          }
        });
      }
}