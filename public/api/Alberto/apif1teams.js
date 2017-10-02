var express=require("express");
var fs=require("fs");
var bodyParser=require("body-parser");
var app=express();

var teams=[];

app.use(bodyParser.json());

//API Alberto
//Métodos GET
//Devuelve un recurso individual
module.exports.getItem=function(req,res){
    var name = req.params.name;
    var team = [];
    console.log("New GET request of resource "+name);
    for(i=0;i<teams.length;i++){
       if(teams[i].name == name){
         team.push(teams[i]);
         break;
       }
    }
    if(team.length!=0){
        res.send(team);
    }else{
      res.sendStatus(404);
    }
}

//Devuelve la lista de recursos
module.exports.getList=function(req,res){
  res.send(teams);
}


//Recurso con método que crea 2 equipos en la lista
module.exports.getLoadInitialData=function(req,res){
  teams=[];
  fs.readFile('./public/api/Alberto/f1teams.json','utf8',(err,content) => {
    f1teams=JSON.parse(content);
    f1teams.forEach((team) =>{
      teams.push(team);
    });
  });
  res.sendStatus(200);
}


//Métodos POST
//Método que añade un nuevo equipo
module.exports.getPostItem=function(req,res){
  //var team=req.body;
 teams.push(req.body);
  console.log("Object recived: "+JSON.stringify(req.body));
 res.sendStatus(200);
}

//Método inválido
module.exports.getPostInvalid=function(req,res){
 res.sendStatus(405);
}

//Métodos DELETE
//Borra toda la lista
module.exports.getDelete=function(req,res){
 teams=[];
 res.sendStatus(200);
}

//Borra un recurso individual
module.exports.getDeleteItem=function(req,res){
 var name=req.params.name;
 var cont=0;
  console.log("New DELETE request of resource "+name);
  for(i=0;i<teams.length;i++){
       if(teams[i].name == name){
         teams.splice(i,1);
         cont=1;
        break;
      }
  }
  if(cont==1){
    res.sendStatus(200);
  }else{
    res.sendStatus(404);
  }
}

//Métodos PUT
//Método inválido
module.exports.getPutInvalid=function(req,res){
 res.sendStatus(405);
}

//Actualiza un elemento de array o en su caso devuelve 404
module.exports.getPut=function(req,res){
    var name = req.params.name;
    var nameUpdated = req.body;
    var cont = 0;
    for(i=0;i<teams.length;i++){
       if(teams[i].name == name){
         teams[i]=nameUpdated;
         cont=1;
         break;
       }
    }
 if(cont==1){
   res.sendStatus(200);
 }else{
   res.sendStatus(404);
 }
}