'use strict';

var express=require("express");
var request = require("request");
var cors=require("cors");
var apiOil  = require('./public/api/Alberto/oil.js');
var apiPopulation  = require('./public/api/Alberto/population.js');
var app=express();
app.use(cors());


//Resto SLA

//PROXY ALBERTO

app.use('/api/v1/oil', apiOil);
app.use('/1.0/population/Spain/18',apiPopulation)


var fs=require("fs");
var bodyParser=require("body-parser");
var time=require("./time.js");
var spainBirthsApi=require("./public/api/Alberto/spain-births-api.js");
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

app.use(bodyParser.json());
//----


/*

var passport = require('passport');
var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;
app.use(passport.initialize());

passport.use(new LocalAPIKeyStrategy(
  function(apikey, done) {
    done(null,apikey);
  }
));

function WriteAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!='write') {
            return res.sendStatus(401);
        }
        return next();
    })(req, res, next);
};

function ReadAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!='read') {
            return res.sendStatus(401);
        }
        return next();
    })(req, res, next);
};
*/

//---

var passportKey = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;
app.use(passportKey.initialize());

passportKey.use(new LocalAPIKey(
  function(apikey, done) {
    done(null,apikey);
  }
));

/*function keyW(req, res, next) {
    passportKey.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!="patriW") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};

function keyR(req, res, next) {
    passportKey.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!="patriR") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};*/


//Time
app.get("/time",time.getTime);

//Spain Births API (Main API Alberto)
app.use("/api/v1/spain-births",spainBirthsApi);




//Swagger Alberto
var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./public/api/Alberto/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});
//----------------------------------------------------------

app.use('/',express.static(__dirname + '/public'));

app.use('/mort-sickness', express.static(__dirname + '/mort-sickness'));


app.use('/population-growth',express.static(__dirname + '/public/population-growth'));


var port = (process.env.PORT || 11000);
app.listen(port, ()=>{
    console.log("Magic happens on port: " + port);
});
