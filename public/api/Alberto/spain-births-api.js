var express=require("express");
var functions=require("./functions.js");
var fs=require("fs");
var bodyParser=require("body-parser");
var app=express();
var router=express.Router();
/*var passport = require('passport')
var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;*/
/*var keyWrite ="write";
var keyRead="read";*/
var births=[];

//app.use(passport.initialize());
app.use(bodyParser.json());

/*passport.use(new LocalAPIKeyStrategy(
  function(apikey, done) {
    done(null,apikey);
  }
));

function WriteAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!=keyWrite) {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};

function ReadAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!=keyRead) {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};*/

//API Alberto
//Métodos GET
//Devuelve la lista de recursos
router.get("/",(req,res) => {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var from = req.query.from;
  var to = req.query.to;
  var birth=[];
  birth=functions.getListaFTLO(births,from,to,limit,offset);
  res.send(birth);

});

router.get("/loadInitialData",/*WriteAccess,*/(req,res)=>{
    births=[];
    fs.readFile('./public/api/Alberto/spain-births.json','utf8',(err,content) => {
      aux=JSON.parse(content);
      aux.forEach((birth) =>{
        births.push(birth);
      });
    });
    res.sendStatus(200);
});


//Devuelve una lista del recurso, por región, año + búsqueda, paginación
router.get("/:region/",/*ReadAccess,*/(req,res) => {
    var year = req.params.region;
    var region = req.params.region;
    var limit = req.query.limit;
    var offset = req.query.offset;
    var from = req.query.from;
    var to = req.query.to;
    birth=functions.getRegionFTLO(births,region,year,from,to,limit,offset);
    if(birth!=0){
      res.send(birth);
    }else{
      res.sendStatus(404);
    }
});

//Consulta un elemento por región y año
router.get("/:region/:year",/*ReadAccess,*/(req,res) => {
    var year = req.params.year;
    var region = req.params.region;
    var birth = functions.getRegionAño(births,region,year);
    if(birth.length!=0){
        res.send(birth);
    }else{
        res.sendStatus(404);
    }
});


//Métodos POST
//Método que añade un nuevo equipo; 409 si ya existe el elemento por región y año
router.post("/",/*WriteAccess,*/(req,res) => {
  var birth=req.body;
  aux=functions.post(births,birth);
  if(aux==1){
    res.sendStatus(409);
  }else if(aux==2){
    res.sendStatus(400);
  }else{
    births=aux;
    res.sendStatus(201);
  }
});

//Método inválido por región
router.post("/:region",/*WriteAccess,*/(req,res) => {
  res.sendStatus(405);
});

//Método inválido por año

router.post("/:year",/*WriteAccess,*/(req,res)=>{
  res.sendStatus(405);
})

//Método inválido por región y año
router.post("/:region/:year",/*WriteAccess,*/(req,res) => {
  res.sendStatus(405);
});

//Métodos DELETE
//Borra toda la lista
router.delete("/",/*WriteAccess,*/(req,res) => {
  births=[];
  res.sendStatus(200);
});

//Borra un recurso individual por región o año; 404 si no está
router.delete("/:region",/*WriteAccess,*/(req,res) => {
  var region=req.params.region;
  var year=req.params.region;
	var cont=0;
  var aux=Object.keys(births).length;
  births=functions.deleteRegion(births,region,year);
  if((aux-births.length)>0){
    res.sendStatus(200);
  }else{
    res.sendStatus(404);
  }
});

//Borra un recurso individual por región y año; 404 si no está
router.delete("/:region/:year",/*WriteAccess,*/(req,res) => {
  var region=req.params.region;
  var year=req.params.year;
  var aux=Object.keys(births).length;
  births=functions.deleteRegionAño(births,region,year);
  if((aux-births.length)>0){
    res.sendStatus(200);
  }else{
    res.sendStatus(404);
  }
});

//Métodos PUT
//Método inválido
router.put("/",/*WriteAccess,*/(req,res) => {
  res.sendStatus(405);
});

//Método inválido
router.put("/:region",/*WriteAccess,*/(req,res) => {
  res.sendStatus(405);
});

//Método inválido
router.put("/:year",/*WriteAccess,*/(req,res)=>{
  res.sendStatus(405);
});

//Actualiza un recurso por región y año; devuelve 404 si no está; devuelve 400 si formato erróneo
router.put("/:region/:year",/*WriteAccess,*/(req,res) => {
    var region = req.params.region;
    var year = req.params.year;
    var regionUpdated = req.body;
    aux=functions.put(births,region,year,regionUpdated);
    if(aux==0){
      res.sendStatus(404);
    }else if(aux==2){
      res.sendStatus(400);
    }else{
      births=aux;
      res.sendStatus(200);
    }
});

module.exports=router;
