var exports=module.exports={};
var functions=require("./functions.js");

exports.initial=function(app,db,BASE_API_PATH){
    
    // GET a collection
app.get(BASE_API_PATH + "/spain-births", function (request, response) {
    var limit = request.query.limit;
    var offset = request.query.offset;
    var from = request.query.from;
    var to = request.query.to; 
    var birth=[];
    console.log("INFO: New GET request to /spain-births");
    db.find({}).toArray(function (err, births) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            birth=functions.getListaFTLO(births,from,to,limit,offset);
            if(birth.length>0){
                console.log("INFO: Sending contacts: " + JSON.stringify(birth, 2, null));
                response.send(birth);
            }else{
                console.log("WARNING: There are not any birth");
                response.sendStatus(404); // not found                
            }
        }
    });
});

//LoadInitialData
app.get(BASE_API_PATH + "/spain-births/loadInitialData", function (request, response) {
    console.log("INFO: New GET request to /loadInitialData");
    console.log('INFO: Initialiting DB...');
        console.log('INFO: Empty DB, loading initial data');
        db.remove({});
        db.find({}).toArray(function(err,births){
           if (err) {
                console.error('WARNING: Error while getting initial data from DB');
                return 0;
            }    
        if(births.length===0){
        var datos=[{"region" : "Andalucia","year": "2009","men":"48751","women":"45865","totalbirth":"94616"},
            {"region" : "Madrid","year": "2010","men":"37851","women":"36027","totalbirth":"73878"},
            {"region" : "Cataluña","year": "2011","men":"41775","women":"39472","totalbirth":"81247"},
            {"region" : "Galicia","year": "2012","men":"10990","women":"10099","totalbirth":"21089"},
            {"region" : "País Vasco","year": "2013","men":"9832","women":"9284","totalbirth":"19116"}
            ];
        db.insert(datos);
        console.log("INFO: Inserted");
        //response.sendStatus(200);
        response.sendStatus(200, BASE_API_PATH + "/");
        }
        else {
            console.log('INFO: DB has ' + births.length + ' objects ');
            response.sendStatus(200);
        }
    });        
});


// GET REGION OR YEAR
app.get(BASE_API_PATH + "/spain-births/:region", function (request, response) {
    var region = request.params.region;
    var year = request.params.region;
    var limit = request.query.limit;
    var offset = request.query.offset;
    var from = request.query.from;
    var to = request.query.to;  
    var birth=[];
    if (!region) {
        console.log("WARNING: New GET request to /spain-births/:region without region, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        if(isNaN(region)){
        console.log("INFO: New GET request to /spain-births/" + region);
        db.find({
            region: region
            }).toArray( function (err, filteredBirths) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                birth=functions.getRegionFTLO(filteredBirths, region,year,from,to,limit,offset);
                if (birth.length > 0) {
                    console.log("INFO: Sending contact: " + JSON.stringify(birth, 2, null));
                    response.send(birth);
                } else {
                    console.log("WARNING: There are not any birth with that params");
                    response.sendStatus(404); // not found
                }
            }
        });
        }else{
            console.log("Soy un numero");
            db.find({
                year: year
                }).toArray( function (err, filteredBirths) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    birth=functions.getRegionFTLO(filteredBirths, region,year,from,to,limit,offset);
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
});


// GET REGION & YEAR
app.get(BASE_API_PATH + "/spain-births/:region/:year", function (request, response) {
    var region = request.params.region;
    var year = request.params.year;
    var limit = request.query.limit;
    var offset = request.query.offset;
    var from = request.query.from;
    var to = request.query.to;  
    var birth=[];    
    if (!year && !region) {
        console.log("WARNING: New GET request to /spain-births/"+region+"/"+year+" without region and year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /spain-births/" + region +"/"+ year);
        db.find({
            region: region,
            year: year
            }).toArray( function (err, filteredBirths) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                birth=functions.getRegionFTLO(filteredBirths,region,year,from,to,limit,offset);
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
});

//POST over a collection
app.post(BASE_API_PATH + "/spain-births", function (request, response) {
    var newBirth = request.body;
    if (!newBirth) {
        console.log("WARNING: New POST request to /spain-births/ without birth, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /contacts with body: " + JSON.stringify(newBirth, 2, null));
        if (!newBirth.region || !newBirth.year || !newBirth.men || !newBirth.women || !newBirth.totalbirth || !newBirth.length==5) {
            console.log("WARNING: The contact " + JSON.stringify(newBirth, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({region:newBirth.region,year:newBirth.year}).toArray( function (err, births) {
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
                        console.log("WARNING: The birth " + JSON.stringify(newBirth, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding contact " + JSON.stringify(newBirth, 2, null));
                        db.insert(newBirth);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});

//POST over multiple resource
app.post(BASE_API_PATH + "/spain-births/:region/:year", function (request, response) {
    var region = request.params.region;
    var year = request.params.year;
    console.log("WARNING: New POST request to /spain-births/" + region + year + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//POST over a single resource
app.post(BASE_API_PATH + "/spain-births/:region", function (request, response) {
    var region = request.params.region;
    console.log("WARNING: New POST request to /spain-births/" + region + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/spain-births", function (request, response) {
    console.log("WARNING: New PUT request to /spain-births, sending 405...");
    response.sendStatus(405); // method not allowed
});

//PUT over multiple resource
app.put(BASE_API_PATH + "/spain-births/:region", function (request, response) {
    var region = request.params.region;
    var year = request.params.region;
    if(isNaN(region)){
    console.log("WARNING: New PUT request to /spain-births/"+ region +", sending 405...");
    response.sendStatus(405); // method not allowed
    }else{
    console.log("WARNING: New PUT request to /spain-births/"+ year +", sending 405...");
    response.sendStatus(405); // method not allowed    
    }
});


//PUT over a single resource
app.put(BASE_API_PATH + "/spain-births/:region/:year", function (request, response) {
    var updatedBirth = request.body;
    var region = request.params.region;
    var year = request.params.year;
    if (!updatedBirth || updatedBirth.region!=region || updatedBirth.year!=year) {
        console.log("WARNING: New PUT request to /contacts/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /spain-births/" + region + " with data " + JSON.stringify(updatedBirth, 2, null));
        if (!updatedBirth.region || !updatedBirth.year || !updatedBirth.men || !updatedBirth.women || !updatedBirth.totalbirth) {
            console.log("WARNING: The contact " + JSON.stringify(updatedBirth, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({
                region:updatedBirth.region,
                $and: [{
                    year: year
                }]
            }).toArray( function (err, contacts) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {

                    if (contacts.length !== 0) {
                        db.update({
                            region: updatedBirth.region,
                            year: year
                        }, updatedBirth);
                        console.log("INFO: Modifying contact with region " + region + " " + year + " with data " + JSON.stringify(updatedBirth, 2, null));
                        response.send(updatedBirth); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any contact with region & year " + region + " " +year);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/spain-births", function (request, response) {
    console.log("INFO: New DELETE request to /spain-births");
    db.remove({}, {multi: true}, function (err, result) {
        var numRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved.n !== 0) {
                console.log("INFO: All births (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no births to delete");
                response.sendStatus(204); // not found
            }
               
        }
    });
});

//DELETE over multiple resource
app.delete(BASE_API_PATH + "/spain-births/:region", function (request, response) {
    var region = request.params.region;
    var year = request.params.region;
    if (!region || !year) {
        console.log("WARNING: New DELETE request to /spain-births/:region without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        if(isNaN(region)){
            console.log("INFO: New DELETE request to /spain-births/" + region);
            db.remove({
                region: region
            }, {multi:true}, function (err, result) {
                var birthRemoved = JSON.parse(result);
                if (err) {
                    console.error('WARNING: Error removing data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    console.log("INFO: Birth removed: " + region);
                    if (birthRemoved.n !== 0) {
                        console.log("INFO: The birth with region " + region + " has been succesfully deleted, sending 204...");
                        response.sendStatus(204); // no content
                    } else {
                        console.log("WARNING: There are no birth to delete");
                        response.sendStatus(404); // not found
                    }
                }
            });
        }else{
            console.log("INFO: New DELETE request to /spain-births/" + year);
            db.remove({
                year: year
            }, {multi:true}, function (err, result) {
                var birthRemoved = JSON.parse(result);
                if (err) {
                    console.error('WARNING: Error removing data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    console.log("INFO: Birth removed: " + year);
                    if (birthRemoved.n !== 0) {
                        console.log("INFO: The birth with year " + year + " has been succesfully deleted, sending 204...");
                        response.sendStatus(204); // no content
                    } else {
                        console.log("WARNING: There are no birth to delete");
                        response.sendStatus(404); // not found
                    }
                }
            });        
        }
    }
});

//DELETE over a single resource
app.delete(BASE_API_PATH + "/spain-births/:region/:year", function (request, response) {
    var region = request.params.region;
    var year = request.params.year;
    if (!region) {
        console.log("WARNING: New DELETE request to /spain-births/:region without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /spain-births/" + region + year);
        db.remove({
            region: region,
            year: year
        }, {}, function (err, result) {
            var birthRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Birth removed: " + region + " " + year);
                if (birthRemoved.n !== 0) {
                    console.log("INFO: The birth with region " + region + year + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no birth to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});
}