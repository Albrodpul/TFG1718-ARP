exports.getRegionAño=function(array,region,year){
	res=[];
	for(i=0;i<array.length;i++){
        if(array[i].year == year && array[i].region == region){
         	res.push(array[i]);
          	break;
       	}
    }
    return res;
};

exports.getListaFTLO=function(array,from,to,limit,offset){
	aux=[];
	if(from && to && limit && offset){
		aux=getListaFT(array,from,to);
		if(aux.length!=0){
			res=getListaLO(aux,limit,offset);
		}else{
			res=aux;
		}
	}else if(from && limit && offset){
		aux=getListaF(array,from);
      	if(aux.length!=0){
      		res=getListaLO(aux,limit,offset);
        }else{
					res=aux;
				}
	}else if(to && limit && offset){
		aux=getListaT(array,to);
		if(aux.length!=0){
      		res=getListaLO(aux,limit,offset);
        }else{
					res=aux;
				}
	}else if(from && to && limit){
		aux=getListaFT(array,from,to);
		if(aux.length!=0){
			res=getListaL(aux,limit);
		}else{
			res=aux;
		}
	}else if(from && limit){
		aux=getListaF(array,from);
		if(aux.length!=0){
			res=getListaL(aux,limit);
		}else{
			res=aux;
		}
	}else if(to && limit){
		aux=getListaT(array,to);
		if(aux.length!=0){
			res=getListaL(aux,limit);
		}else{
			res=aux;
		}
	}else if(from && to && offset){
		aux=getListaFT(array,from,to);
		if(aux.length!=0){
			res=getListaO(aux,offset);
		}else{
			res=aux;
		}
	}else if(from && offset){
		aux=getListaF(array,from);
		if(aux.length!=0){
			res=getListaO(aux,offset);
		}else{
			res=aux;
		}
	}else if(to && offset){
		aux=getListaT(array,to);
		if(aux.length!=0){
			res=getListaO(aux,offset);
		}else{
			res=aux;
		}
	}else if(limit && offset){
		res=getListaLO(array,limit,offset);
	}else if(limit){
		res=getListaL(array,limit);
	}else if(offset){
		res=getListaO(array,offset);
	}else if(from && to){
		res=getListaFT(array,from,to);
	}else if(from){
		res=getListaF(array,from);
	}else if(to){
		res=getListaT(array,to);
	}else{
		res=array;
	}
	return res;
}

function getListaLO(array,limit,offset){
				aux=[];
        aux=array.slice(offset,array.length);
        aux.splice(limit,aux.length);
        return aux;
}

function getListaL(array,limit){
	aux=[];
    for(i=0;i<array.length;i++){
    	aux.push(array[i]);
    }
    aux.splice(limit,array.length);
    return aux;
}

function getListaO(array,offset){
	aux=[];
    aux=array.slice(offset,array.length);
    return aux;
}

function getListaFT(array,from,to){
	aux=[];
    for(i=0;i<array.length;i++){
        if(array[i].year>=from && array[i].year<=to){
    	    aux.push(array[i]);
        }
    }
    return aux;
}

function getListaT(array,to){
	aux=[];
	for(i=0;i<array.length;i++){
        if(array[i].year<=to){
            aux.push(array[i]);
        }
    }
    return aux;
}

function getListaF(array,from){
	aux=[];
    for(i=0;i<array.length;i++){
        if(array[i].year>=from){
          aux.push(array[i]);
        }
    }
    return aux;
}


exports.getRegionFTLO=function(array,region,year,from,to,limit,offset){
	aux=[];
	if(from && to && limit && offset){
		aux=getRegionFT(array,region,year,from,to);
		if(aux.length!=0){
			res=getRegionLO(aux,region,year,limit,offset);
		}else{
			res=0;
		}
	}else if(from && limit && offset){
		aux=getRegionF(array,region,year,from);
      	if(aux.length!=0){
      		res=getRegionLO(aux,region,year,limit,offset);
        }else{
        	res=0;
        }
	}else if(to && limit && offset){
		aux=getRegionT(array,region,year,to);
		if(aux.length!=0){
      		res=getRegionLO(aux,region,year,limit,offset);
        }else{
        	res=0;
        }
	}else if(from && to && limit){
		aux=getRegionFT(array,region,year,from,to);
		if(aux.length!=0){
			res=getRegionL(aux,region,year,limit);
		}else{
        	res=0;
        }
	}else if(from && limit){
		aux=getRegionF(array,region,year,from);
		if(aux.length!=0){
			res=getRegionL(aux,region,year,limit);
		}else{
        	res=0;
        }
	}else if(to && limit){
		aux=getRegionT(array,region,year,to);
		if(aux.length!=0){
			res=getRegionL(aux,region,year,limit);
		}else{
        	res=0;
        }
	}else if(from && to && offset){
		aux=getRegionFT(array,region,year,from,to);
		if(aux.length!=0){
			res=getRegionO(aux,region,year,offset);
		}else{
        	res=0;
        }
	}else if(from && offset){
		aux=getRegionF(array,from);
		if(aux.length!=0){
			res=getRegionO(aux,region,year,offset);
		}else{
        	res=0;
        }
	}else if(to && offset){
		aux=getRegionT(array,region,year,to);
		if(aux.length!=0){
			res=getRegionO(aux,region,year,offset);
		}else{
        	res=0;
        }
	}else if(limit && offset){
		aux=getRegionLO(array,region,year,limit,offset);
		if(aux.length!=0){
			res=aux;
		}else{
			res=0;
		}
	}else if(limit){
		aux=getRegionL(array,region,year,limit);
		if(aux.length!=0){
			res=aux;
		}else{
			res=0;
		}
	}else if(offset){
		aux=getRegionO(array,region,year,offset);
		if(aux.length!=0){
			res=aux;
		}else{
			res=0;
		}
	}else if(from && to){
		aux=getRegionFT(array,region,year,from,to);
		if(aux.length!=0){
			res=aux;
		}else{
			res=0;
		}
	}else if(from){
		aux=getRegionF(array,region,year,from);
		if(aux.length!=0){
			res=aux;
		}else{
			res=0;
		}
	}else if(to){
		aux=getRegionT(array,region,year,to);
		if(aux.length!=0){
			res=aux;
		}else{
			res=0;
		}
	}else{
		aux=getRegion(array,region,year);
		if(aux.length!=0){
			res=aux;
		}else{
			res=0;
		}
	}
	return res;
}

function getRegionLO(array,region,year,limit,offset){
	aux=[];
	for(i=0;i<array.length;i++){
        if(array[i].region == region || array[i].year == year){
            aux.push(array[i]);
        }
    }
    aux2=aux.slice(offset,aux.length);
    aux2.splice(limit,aux.length);
    return aux2;
}

function getRegionL(array,region,year,limit){
	aux=[];
	for(i=0;i<array.length;i++){
        if(array[i].region == region || array[i].year == year){
            aux.push(array[i]);
        }
    }
    aux.splice(limit,aux.length);
    return aux;
}

function getRegionO(array,region,year,offset){
	aux=[];
	for(i=0;i<array.length;i++){
        if(array[i].region == region || array[i].year == year){
            aux.push(array[i]);
        }
    }
    aux2=aux.slice(offset,aux.length);
    return aux2;
}

function getRegionFT(array,region,year,from,to){
	aux=[];
    for(i=0;i<array.length;i++){
        if((array[i].region == region || array[i].year == year) && array[i].year>=from && array[i].year<=to){
    	    aux.push(array[i]);
        }
    }
    return aux;
}

function getRegionT(array,region,year,to){
	aux=[];
	for(i=0;i<array.length;i++){
        if((array[i].region == region || array[i].year == year) && array[i].year<=to){
            aux.push(array[i]);
        }
    }
    return aux;
}

function getRegionF(array,region,year,from){
	aux=[];
    for(i=0;i<array.length;i++){
        if((array[i].region == region || array[i].year == year) && array[i].year>=from){
          aux.push(array[i]);
        }
    }
    return aux;
}
function getRegion(array,region,year){
	aux=[];
    for(i=0;i<array.length;i++){
        if(array[i].region == region || array[i].year == year){
          aux.push(array[i]);
        }
    }
    return aux;
}

exports.deleteRegionAño=function(array,region,year){
    for(i=0;i<array.length;i++){
        if(array[i].region == region && array[i].year == year){
 	        array.splice(i,1);
    	    break;
        }
    }
    return array;
}

exports.deleteRegion=function(array,region,year){
	var aux=Object.keys(array).length;
    for(j=0;j<aux;j++){
      	for(i=0;i<array.length;i++){
      		if(array[i].region == region || array[i].year == year){
          		array.splice(i,1);
         	}
      	}
    }
    return array;
}

exports.post=function(array,body){
	var aux=Object.keys(body).length;
	var res=0;
	if(array.length==0){
      if(body.region && body.year && body.men && body.women && body.totalbirth && aux==5){
        array.push(body);
        res=array;
      }else{
        res=2;
      }
    }else{
        for(i=0;i<array.length;i++){
          if(array[i].region==body.region && array[i].year==body.year){
            res=1;
            break;
          }
        }
        if(res==0){
        	if(body.region && body.year && body.men && body.women && body.totalbirth && aux==5){
        		array.push(body);
          		res=array;
        	}else{
        		res=2;
        	}
    	}
    }
    return res;
}

exports.put=function(array,region,year,body){
	var res=0;
	var aux=Object.keys(body).length;
	for(i=0;i<array.length;i++){
        if(array[i].region == region && array[i].year == year){
        	res=1;
            if(array[i].region==body.region && array[i].year==body.year && body.region && body.year && body.men && body.women && body.totalbirth && aux==5 && res==1){
              	array[i]=body;
              	res=array;
              	break;
            }else{
              	res=2;
            }
    	}
    }
    return res;
}
