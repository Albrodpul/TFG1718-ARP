var sickness = [];

/*var keyR = "patriR";
var keyW = "patriW";*/
//métodos GET 
module.exports.getSickness = function(req,res){
	var buscado = -1;
	var aux= [];
	var aux1=[];
	var fr = req.query.from;
	var to = req.query.to;
	var limit = req.query.limit;
	var offset = req.query.offset;
		if(fr == undefined && to == undefined){
			for(var i=0; i<sickness.length;i++){
				if(limit<=0){
					res.send(aux);
					break;
				}else if(offset>=sickness.length){
					console.log("Not found with this offset");
					buscado=-1;
				}else if(!limit && !offset){
					buscado = i;
					console.log("NEW GET");
					res.send(sickness);
					break;
				}else if(limit && !offset){
					buscado = i;
					console.log("NEW GET with limit");
					aux.push(sickness[i]);
					aux.splice(limit,aux.length);
				}else if(!limit && offset){
					buscado=i;
					console.log("NEW GET with offset");
					aux=sickness.slice(offset,sickness.length);
				}else if(limit && offset){
					buscado = i;
					console.log("NEW GET with limit and offset");
					aux.push(sickness[i]);
					aux=sickness.slice(offset, sickness.length);
					aux.splice(limit, aux.length);
					break;
				}
			}
		}else if(fr != undefined && to == undefined){
			for(var i = 0; i<sickness.length; i++){
				if(sickness[i].year>=fr){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=sickness.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado=i;
						console.log("New GET with from");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado = i;
						console.log("New GET with from and limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado = i;
						console.log("New GET with from and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado = i;
						console.log("New GET with from, limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux1.length);
						}
					}
				}
			}
		}else if(fr == undefined && to != undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year<=to){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=sickness.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado=i;
						console.log("New GET with to");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado=i;
						console.log("New GET with to and limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado =i;
						console.log("New GET with to and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado =i;
						console.log("New GET with to, limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux1.length);
						}
					}
				}
			}
		}else if(fr != undefined && to != undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year>=fr && sickness[i].year<=to){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=sickness.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado=i;
						console.log("New GET with from and to");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado = i;
						console.log("New GET with from, to and limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado =i;
						console.log("New GET with from, to and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado=i;
						console.log("New GET with from, to, limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
						aux=aux1.slice(offset, aux1.length);
						aux.splice(limit, aux.length);
					}
				}
			}
		}
	}

		if(aux.length!=0 || sickness.length==0){
			res.send(aux);
		}
		if(buscado==-1){
			res.sendStatus(404);
		}
}

module.exports.getSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.params.region;
	var year = req.params.year;
	var fr = req.query.from;
	var to = req.query.to;
		for(var i=0; i<sickness.length; i++){
			if(region == sickness[i].region && year == sickness[i].year){
				buscado=i;
				console.log("New GET of resource region with year");
				var atributo = sickness[i];
				res.status(200).send(atributo);
				break;
			}
		}
		if(buscado == -1){
			res.sendStatus(404);
		}
}

module.exports.getLoad = function(req,res){
	buscado=1;
	    sickness=[{"region": "Andalucia","sickness": "Sifilis", "year": "2009", "mortalityInMen": "60", "mortalityInWomen": "0", "totalMortality": "60"},
	    {"region": "Andalucia","sickness": "Sifilis", "year": "2004", "mortalityInMen": "60", "mortalityInWomen": "0", "totalMortality": "20"},
	    {"region": "Andalucia","sickness": "Sifilis", "year": "2008", "mortalityInMen": "60", "mortalityInWomen": "0", "totalMortality": "20"},
		{"region": "Galicia","sickness": "Clamidia", "year": "2012", "mortalityInMen": "0", "mortalityInWomen": "0", "totalMortality": "10"},
		{"region": "Pais Vasco","sickness": "VIH", "year": "2013", "mortalityInMen": "239", "mortalityInWomen": "32", "totalMortality": "135"},
		{"region": "Madrid","sickness": "Gonorrea", "year": "2010", "mortalityInMen": "0", "mortalityInWomen": "0", "totalMortality": "40"},
		{"region": "Cataluña","sickness": "Herpes Simple", "year": "2011", "mortalityInMen": "40", "mortalityInWomen": "20", "totalMortality": "40"}];
		//sickness=initial_array;
		console.log("Load Initial Data");
		res.sendStatus(200);
	}

module.exports.getSicknessRegion = function(req,res){
	var aux = [];
	var aux1 = [];
	var aux2 = [];
	var buscado = -1;
	var name = req.params.region;
	var fr = req.query.from;
	var to = req.query.to;
	var limit = req.query.limit;
	var offset = req.query.offset;
		if(fr==undefined && to==undefined){
			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].region){
					aux2.push(sickness[i]);
				}
			}
			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].region){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=aux2.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado = i;
						console.log("New GET of resource region");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado=i;
						console.log("New GET of resource region with limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado = i;
						console.log("New GET of resource region with offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado = i;
						console.log("New GET of resource region with limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux.length);
						}
					}
				}
			}

			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].year){
					aux2.push(sickness[i]);
				}
			}

			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].year){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=aux2.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado = i;
						console.log("New GET of resource year");
						aux.push(sickness[i]);	
					}else if(limit && !offset){
						buscado = i;
						console.log("New GET of resource year with limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);	
					}else if(!limit && offset){
						buscado = i;
						console.log("New GET of resource year with offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado = i;
						console.log("New GET of resource year with limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux.length);
						}
					}
				}
			}

			if(aux.length!=0){
				res.send(aux);
			}
			if(buscado == -1){
				res.sendStatus(404);
			}
		}

		if(fr!=undefined && to!=undefined){
			for(var j=fr; j<=to; j++){
				for(var i=0;i<sickness.length;i++){
					if(sickness[i].year==j && name==sickness[i].region){
						aux2.push(sickness[i]);
					}
				}
			}
			for(var j=fr; j<=to; j++){
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year==j && sickness[i].region == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from and to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from, to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
					}
				}
			}
			for(var j=fr; j<=to; j++){
				for(var i=0;i<sickness.length;i++){
					if(sickness[i].year==j && name==sickness[i].year){
						aux2.push(sickness[i]);
					}
				}
			}
			for(var j=fr; j<=to; j++){
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year==j && sickness[i].year == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from and to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from, to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
					}
				}
			}

			if(aux.length!=0){
				res.send(aux);
			}
			if(buscado == -1){
				res.sendStatus(404);
			}
		}

		if(fr!=undefined && to==undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year>=fr && sickness[i].region == name){
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year>=fr && sickness[i].region == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with from and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
					}
				}

			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year>=fr && sickness[i].year == name){
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year>=fr && sickness[i].year == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource year with from");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource year with from and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource year with from and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource year with from, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
					}
				}
			if(aux.length!=0){
				res.send(aux);
			}
			if(buscado == -1){
				res.sendStatus(404);
			}
		}

		if(fr==undefined && to!=undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year<=to && sickness[i].region == name){
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year<=to && sickness[i].region == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
				}
			}

			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year<=to && sickness[i].year == name){
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year<=to && sickness[i].year == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource year with to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource year with to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource year with to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource year with to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
				}
			}
			if(aux.length!=0){
				res.send(aux);
			}
			if(buscado == -1){
				res.sendStatus(404);
			}
		}
}

//métodos POST

module.exports.postSickness = function(req,res){
	var sick = req.body;
	var region = sick.region;
	var year = sick.year;
	var sic = sick.sickness;
	var mortMen = sick.mortalityInMen;
	var mortWomen = sick.mortalityInWomen;
	var totalMort = sick.totalMortality;
	var buscado = 0;
	if(sickness.length==0){
		if(Object.keys(sick).length==6 && region!=undefined && year!=undefined && sic!=undefined && mortMen!=undefined && mortWomen!=undefined 
		&& totalMort!=undefined && region!='' && year!='' && sic!='' && mortMen!='' && mortWomen!='' 
		&& totalMort!=''){
			sickness.push(sick);
			res.sendStatus(201);
		}else{
			res.sendStatus(400);
		}
	}else{
		if(Object.keys(sick).length==6 && region!=undefined && year!=undefined && sic!=undefined && mortMen!=undefined && mortWomen!=undefined 
		&& totalMort!=undefined && region!='' && year!='' && sic!='' && mortMen!='' && mortWomen!='' 
		&& totalMort!=''){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].region==sick.region &&  sickness[i].year ==sick.year){
					buscado=1;//Error porque ya existe
					break;
				}
			}
			if(buscado==1){
				res.sendStatus(409);
			}else{
				sickness.push(sick);
				console.log("NEW POST " + region);
				res.sendStatus(201);
			}
		}else{
			res.sendStatus(400);
		}
	}
}

module.exports.postSicknessRegion = function(req,res){
		console.log("Method Not Allowed");
		res.sendStatus(405);
}
module.exports.postSicknessRegionYear = function(req,res){
		console.log("Method Not Allowed");
		res.sendStatus(405);
}
//métodos PUT
module.exports.putSickness = function(req,res){
		console.log("Method Not Allowed");
		res.sendStatus(405);
}

module.exports.putSicknessRegionYear = function(req,res){
	var encontrado = -1;
  var region = req.params.region;
  var year = req.params.year;
  var p = req.body;
  console.log(region + "," + year);
  var x = p.region;
  var x2 = p.sickness;
  var x3 = p.year;
  var x4 = p.mortalityInMen;
  var x5 = p.mortalityInWomen;
  var x6 = p.totalMortality;
  
  var alb = Object.keys(p).length;

  if(sickness.length==0){
    res.sendStatus(400);
  }else{
    if(x==undefined || x2==undefined || x3==undefined || x4==undefined || x5==undefined || x6==undefined 
      || alb!=6 || x=='' || x2=='' || x3=='' || x4=='' || x5=='' || x6==''){
      res.sendStatus(400);
    }else{
      if(year!=p.year || region!=p.region){
        res.sendStatus(400);
      }else{
        for(var i = 0; i< sickness.length; i++){
          if(region == sickness[i].region){
            var t = sickness[i];
            if(t.year == year){
              encontrado = i;
              console.log("New PUT of resource " + t.region + "/" + t.year);
              sickness[i] = p;
              res.sendStatus(200);
            }
          }
        }
        if (encontrado == -1){
          console.log("Operation PUT not permitted because the object is not found");
          res.sendStatus(404);
        }
      }

    }
  }

}


//métodos DELETE

module.exports.deleteSickness = function(req,res){
		for(var i=0; i<sickness.length; i++){
			sickness.splice(0,sickness.length);
			res.sendStatus(200);
		}
		console.log("Delete mort-sickness list");
}

module.exports.deleteSicknessRegion = function(req,res){
	var sick = sickness.length;
	var buscado = -1;
	var name= req.params.region;
		for(var j=0; j<sick; j++){
			for(var i=0; i<sickness.length; i++){
				if(name==sickness[i].region){
					buscado = 1;
					console.log("Delete this region");
					sickness.splice(i,1);
				}
			}
		}
		for(var j=0; j<sick; j++){
			for(var i=0; i<sickness.length; i++){
				if(name==sickness[i].year){
					buscado = 1;
					console.log("Delete this year");
					sickness.splice(i,1);
				}
			}
		}
		if(buscado == 1){
			res.sendStatus(200);
		}else{
			res.sendStatus(404);
		}	
}

module.exports.deleteSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.params.region;
	var year = req.params.year;
		for(var i=0; i<sickness.length;i++){
			if(region == sickness[i].region && year == sickness[i].year){
				buscado=i;
				console.log("Delete this mort-sickness of region and year");
				sickness.splice(i,1);
				res.sendStatus(200);
				break;
			}
		}
		if(buscado == -1){
			res.sendStatus(404);
		}
}