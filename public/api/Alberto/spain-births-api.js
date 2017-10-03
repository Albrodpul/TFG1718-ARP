var exports=module.exports={};


exports.initial=function(app,db,BASE_API_PATH){
    
    // GET a collection
app.get(BASE_API_PATH + "/spain-births", function (request, response) {
    console.log("INFO: New GET request to /spain-births");
    db.find({}).toArray(function (err, births) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending contacts: " + JSON.stringify(births, 2, null));
            response.send(births);
        }
    });
});

//LoadInitialData
app.get(BASE_API_PATH + "/loadInitialData", function (request, response) {
    console.log("INFO: New GET request to /loadInitialData");
    db.remove({}, {multi: true}, function (err, result) {
        var birthRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (birthRemoved.n > 0) {
                console.log("INFO: All the births (" + birthRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no birth to delete");
                response.sendStatus(404); // not found
            }
        }
    });
    db.find({}).toArray(function (err, births) {
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
    if (births.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

        var birth=[{"region" : "Andalucia","year": "2009","men":"48751","women":"45865","totalbirth":"94616"},
            {"region" : "Madrid","year": "2010","men":"37851","women":"36027","totalbirth":"73878"},
            {"region" : "Cataluña","year": "2011","men":"41775","women":"39472","totalbirth":"81247"},
            {"region" : "Galicia","year": "2012","men":"10990","women":"10099","totalbirth":"21089"},
            {"region" : "País Vasco","year": "2013","men":"9832","women":"9284","totalbirth":"19116"}
            ];
        db.insert(birth);
    } else {
        console.log('INFO: DB has ' + births.length + ' contacts ');
    }
    });
});


// GET a single resource
app.get(BASE_API_PATH + "/spain-births/:region", function (request, response) {
    var region = request.params.region;
    if (!region) {
        console.log("WARNING: New GET request to /spain-births/:region without region, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /spain-births/" + region);
        db.find({region:region}).toArray( function (err, filteredBirths) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {

                if (filteredBirths.length > 0) {
                    var birth = filteredBirths[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending contact: " + JSON.stringify(birth, 2, null));
                    response.send(birth);
                } else {
                    console.log("WARNING: There are not any birth with region " + region);
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
        if (!newBirth.region || !newBirth.year || !newBirth.men || !newBirth.women || !newBirth.totalbirth) {
            console.log("WARNING: The contact " + JSON.stringify(newBirth, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({region:newBirth.region,year:newBirth.year,men:newBirth.men,women:newBirth.women,totalbirth:newBirth.totalbirth}).toArray( function (err, births) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {

                    if (births.length > 0) {
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


//PUT over a single resource
app.put(BASE_API_PATH + "/spain-births/:region", function (request, response) {
    var updatedBirth = request.body;
    var region = request.params.region;
    if (!updatedBirth) {
        console.log("WARNING: New PUT request to /contacts/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /spain-births/" + region + " with data " + JSON.stringify(updatedBirth, 2, null));
        if (!updatedBirth.region || !updatedBirth.year || !updatedBirth.men || !updatedBirth.women || !updatedBirth.totalbirth) {
            console.log("WARNING: The contact " + JSON.stringify(updatedBirth, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({region:updatedBirth.region}).toArray( function (err, contacts) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {

                    if (contacts.length > 0) {
                        db.update({region: updatedBirth.region}, updatedBirth);
                        console.log("INFO: Modifying contact with region " + region + " with data " + JSON.stringify(updatedBirth, 2, null));
                        response.send(updatedBirth); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any contact with region " + region);
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
        var birthRemoved = JSON.parse(result);
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (birthRemoved.n > 0) {
                console.log("INFO: All the births (" + birthRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no birth to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/spain-births/:region", function (request, response) {
    var region = request.params.region;
    if (!region) {
        console.log("WARNING: New DELETE request to /spain-births/:region without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /spain-births/" + region);
        db.remove({region: region}, {}, function (err, result) {
            var birthRemoved = JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Birth removed: " + region);
                if (birthRemoved.n === 1) {
                    console.log("INFO: The birth with region " + region + " has been succesfully deleted, sending 204...");
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