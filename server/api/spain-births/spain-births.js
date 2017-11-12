var spainBirthsModel = require("../../model/spain-births");
require('mongoose').model('spain-births');
var functions = require("./functions.js");
var mongoose = require('mongoose');
var SpainBirths = mongoose.model('spain-births');
var csvjson = require('csvjson');
var csvFilePath = '/api/spain-births/spain-births.csv';
var path = require('path');
var fs = require("fs");
var baseApiUrl = "/api/v1/spain-births";
module.exports = {
    // GET a collection
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
    //LoadInitialData
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
            console.log("Contenido: " + element);
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
                    console.log("INFO: Inserted" + element.region);
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
    // GET REGION OR YEAR
    getRegionOrYear: function (request, response, next) {
        var region = request.params.region;
        var year = request.params.region;
        var limit = request.query.limit;
        var offset = request.query.offset;
        var from = request.query.from;
        var to = request.query.to;
        var birth = [];
        if (!region || !year) {
            console.log("WARNING: New GET request to /spain-births/ without region or year, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            if (isNaN(region)) {
                console.log("INFO: New GET request to /spain-births/" + region);
                SpainBirths.find({
                    region: region
                }, function (err, filteredBirths) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        response.sendStatus(500); // internal server error
                    } else {
                        birth = functions.getRegionFTLO(filteredBirths, region, year, from, to, limit, offset);
                        if (birth.length > 0) {
                            console.log("INFO: Sending contact: " + JSON.stringify(birth, 2, null));
                            response.send(birth);
                        } else {
                            console.log("WARNING: There are not any birth with that params");
                            response.sendStatus(404); // not found
                        }
                    }
                });
            } else {
                console.log("INFO: New GET request to /spain-births/" + year);
                SpainBirths.find({
                    year: Number(year)
                }, function (err, filteredBirths) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        response.sendStatus(500); // internal server error
                    } else {
                        birth = functions.getRegionFTLO(filteredBirths, region, year, from, to, limit, offset);
                        if (birth.length > 0) {
                            console.log("INFO: Sending contact: " + JSON.stringify(birth, 2, null));
                            response.send(birth);
                        } else {
                            console.log("WARNING: There are not any birth with that params");
                            response.sendStatus(404); // not found
                        }
                    }
                });
            }
        }
    },
    // GET REGION & YEAR
    getRegionYear: function (request, response, next) {
        var region = request.params.region;
        var year = request.params.year;
        var limit = request.query.limit;
        var offset = request.query.offset;
        var from = request.query.from;
        var to = request.query.to;
        var birth = [];
        if (!year && !region) {
            console.log("WARNING: New GET request to /spain-births/" + region + "/" + year + " without region and year, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            console.log("INFO: New GET request to /spain-births/" + region + "/" + year);
            SpainBirths.find({
                region: region,
                year: Number(year)
            }, function (err, filteredBirths) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    birth = functions.getRegionFTLO(filteredBirths, region, year, from, to, limit, offset);
                    if (birth.length > 0) {
                        console.log("INFO: Sending contact: " + JSON.stringify(birth, 2, null));
                        response.send(birth);
                    } else {
                        console.log("WARNING: There are not any birth with that params");
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    },
    //POST over a collection
    post: function (request, response, next) {
        var newBirth = request.body;
        if (!newBirth) {
            console.log("WARNING: New POST request to /spain-births/ without birth, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            console.log("INFO: New POST request to /spain-births/ with body: " + JSON.stringify(newBirth, 2, null));
            if (!newBirth.region || !newBirth.year || !newBirth.men || !newBirth.women || !newBirth.totalbirth || Object.keys(newBirth).length !== 5 ||
                newBirth.region === "undefined" || newBirth.year === "undefined" || newBirth.men === "undefined" || newBirth.women === "undefined" || newBirth.totalbirth === "undefined" ||
                !isNaN(newBirth.region) || isNaN(newBirth.year) || isNaN(newBirth.men) || isNaN(newBirth.women) || isNaN(newBirth.totalbirth)) {
                console.log("WARNING: The birth " + JSON.stringify(newBirth, 2, null) + " is not well-formed, sending 422...");
                response.sendStatus(422); // unprocessable entity
            } else {
                SpainBirths.find({
                    region: newBirth.region,
                    year: newBirth.year
                }, function (err, births) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        response.sendStatus(500); // internal server error
                    } else {
                        var birthsBeforeInsertion = births.filter((result) => {
                            return (result.region.localeCompare(newBirth.region, "en", {
                                'sensitivity': 'base'
                            }) === 0);
                        });
                        if (birthsBeforeInsertion.length > 0) {
                            console.log("WARNING: The birth " + JSON.stringify(newBirth, 2, null) + " already exist, sending 409...");
                            response.sendStatus(409); // conflict
                        } else {
                            new SpainBirths({
                                region: newBirth.region,
                                year: Number(newBirth.year),
                                men: Number(newBirth.men),
                                women: Number(newBirth.women),
                                totalbirth: Number(newBirth.totalbirth)
                            })
                                .save(function (err) {
                                    if (err) {
                                        response.status(504); //gateway timeout
                                        response.end(err);
                                    } else {
                                        console.log("INFO: Adding birth " + JSON.stringify(newBirth, 2, null));
                                        response.sendStatus(201); // created
                                        response.end();
                                    }
                                });
                        }
                    }
                });
            }
        }
    },
    //POST over multiple resource
    postRegion: function (request, response, next) {
        var region = request.params.region;
        var year = request.params.year;
        console.log("WARNING: New POST request to /spain-births/" + region + year + ", sending 405...");
        response.sendStatus(405); // method not allowed
    },
    //POST over a single resource
    postRegionYear: function (request, response, next) {
        var region = request.params.region;
        console.log("WARNING: New POST request to /spain-births/" + region + ", sending 405...");
        response.sendStatus(405); // method not allowed
    },
    //PUT over a collection
    put: function (request, response, next) {
        console.log("WARNING: New PUT request to /spain-births, sending 405...");
        response.sendStatus(405); // method not allowed
    },
    //PUT over multiple resource
    putRegion: function (request, response, next) {
        var region = request.params.region;
        var year = request.params.region;
        if (isNaN(region)) {
            console.log("WARNING: New PUT request to /spain-births/" + region + ", sending 405...");
            response.sendStatus(405); // method not allowed
        } else {
            console.log("WARNING: New PUT request to /spain-births/" + year + ", sending 405...");
            response.sendStatus(405); // method not allowed    
        }
    },
    //PUT over a single resource
    putRegionYear: function (request, response, next) {
        var updatedBirth = request.body;
        var region = request.params.region;
        var year = request.params.year;
        if (!updatedBirth || updatedBirth.region != region || updatedBirth.year != year) {
            console.log("WARNING: New PUT request to /spain-births/ without contact, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            console.log("INFO: New PUT request to /spain-births/" + region + "/" + year + " with data " + JSON.stringify(updatedBirth, 2, null));
            if (!updatedBirth.region || !updatedBirth.year || !updatedBirth.men || !updatedBirth.women || !updatedBirth.totalbirth || Object.keys(updatedBirth).length !== 5 ||
                updatedBirth.region === "undefined" || updatedBirth.year === "undefined" || updatedBirth.men === "undefined" || updatedBirth.women === "undefined" || updatedBirth.totalbirth === "undefined" ||
                isNaN(updatedBirth.men) || isNaN(updatedBirth.women) || isNaN(updatedBirth.totalbirth)) {
                console.log("WARNING: The contact " + JSON.stringify(updatedBirth, 2, null) + " is not well-formed, sending 422...");
                response.sendStatus(422); // unprocessable entity
            } else {
                SpainBirths.find({
                    region: region,
                    $and: [{
                        year: Number(year)
                    }]
                }, function (err, birth) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        response.sendStatus(500); // internal server error
                    } else {
                        SpainBirths.update(
                            {
                                region: region,
                                year: year
                            },
                            {
                                $set:
                                    {
                                        men: updatedBirth.men,
                                        women: updatedBirth.women,
                                        totalbirth: updatedBirth.totalbirth
                                    }
                            },
                            function (err) {
                                if (err) {
                                    console.log("WARNING: There are not any contact with region & year " + region + " " + year);
                                    response.sendStatus(404); // not found
                                    console.log(err);
                                } else {
                                    console.log("INFO: Modifying contact with region " + region + " " + year + " with data " + JSON.stringify(updatedBirth, 2, null));
                                    response.send(updatedBirth); // return the updated contact
                                }
                            });
                    }
                });
            }
        }
    },
    //DELETE over a multiple resource
    deleteRegion: function (request, response, next) {
        var region = request.params.region;
        var year = request.params.region;
        if (!region || !year) {
            console.log("WARNING: New DELETE request to /spain-births/" + region + " without region, sending 400...");
            response.sendStatus(400); // bad request
        } else {
            if (isNaN(region)) {
                console.log("INFO: New DELETE request to /spain-births/" + region);
                SpainBirths.find({
                    region: region
                }, function (err) {
                    if (err) {
                        console.error('WARNING: Error removing data from DB');
                        response.sendStatus(500); // internal server error
                        reqquest.end();
                    }
                }).remove(function (err) {
                    if (err) {
                        console.log("WARNING: There are no birth to delete");
                        response.sendStatus(404); // not found
                        response.end(err);
                    } else {
                        console.log("INFO: Birth removed: " + region);
                        console.log("INFO: The birth with region " + region + "has been succesfully deleted, sending 204...");
                        response.sendStatus(204); // no content
                        response.end();
                    }
                });
            } else {
                console.log("INFO: New DELETE request to /spain-births/" + year);
                SpainBirths.find({
                    year: Number(year)
                }, function (err) {
                    if (err) {
                        console.error('WARNING: Error removing data from DB');
                        response.sendStatus(500); // internal server error
                        reqquest.end();
                    }
                }).remove(function (err) {
                    if (err) {
                        console.log("WARNING: There are no birth to delete");
                        response.sendStatus(404); // not found
                        response.end(err);
                    } else {
                        console.log("INFO: Birth removed: " + year);
                        console.log("INFO: The birth with region " + year + "has been succesfully deleted, sending 204...");
                        response.sendStatus(204); // no content
                        response.end();
                    }
                });
            }
        }
    },
    //DELETE over a single resource
    deleteRegionYear: function (request, response, next) {
        var region = request.params.region;
        var year = request.params.year;
        if (!region) {
            console.log("WARNING: New DELETE request to /spain-births/" + region + "/" + year + " without region, sending 400...");
            response.sendStatus(400); // bad request    
        } else {
            console.log("INFO: New DELETE request to /spain-births/" + region + "/" + year);
            SpainBirths.find({
                region: region,
                year: Number(year)
            }, function (err) {
                if (err) {
                    console.error('WARNING: Error removing data from DB');
                    response.sendStatus(500); // internal server error
                    reqquest.end();
                }
            }).remove(function (err) {
                if (err) {
                    console.log("WARNING: There are no birth to delete");
                    response.sendStatus(404); // not found
                    response.end(err);
                } else {
                    console.log("INFO: Birth removed: " + region + " " + year);
                    console.log("INFO: The birth with region " + region + " " + year + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                    response.end();
                }
            });
        }
    },
    //DELETE over a collection
    deleteAll: function (request, response, next) {
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