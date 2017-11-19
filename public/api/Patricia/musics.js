
var musics=[];

//post collection patri
module.exports.postMusics=function(req,res){
	var music = req.body;
	musics.push(music);
	console.log("New POST " + music.name);
	res.sendStatus(200);
}

//post name patri
module.exports.postMusicsName=function(req,res){
	console.log("Method not allowed");
	res.sendStatus(405);
}

//get collection patri
module.exports.getMusics=function(req,res){
	console.log("NEW GET");
	res.send(musics);
}

//get name patri
module.exports.getMusicsName=function(req,res){
	var buscado = -1;
	var name = req.params.name;
	for(var i=0;i<musics.length;i++){
		if(name==musics[i].name){
			buscado = i;
			console.log("New GET of resource name");
			var atributo = musics[i];
			res.send(atributo);
			break;	
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
}

//delete collection patri
module.exports.deleteMusics=function(req,res){
	for(var i=0; i<musics.length; i++){
		musics.splice(i);
		res.sendStatus(200);
	}
	console.log("Delete songs list");
}

//delete name patri
module.exports.deleteMusicsName=function(req,res){
	var buscado = -1;
	var name = req.params.name;
	for(var i=0; i<musics.length; i++){
		if(name==musics[i].name){
		buscado = i;
		console.log("Delete this song");
		musics.splice(i);
		res.sendStatus(200);
		break;
		}	
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
}

//put collection patri
module.exports.putMusics=function(req,res){
	console.log("Method not allowed");
	res.sendStatus(405);
}

//put name patri
module.exports.putMusicsName=function(req,res){
	var buscado = -1;
	var name = req.params.name;
	var nueva = req.body;
	for(var i=0; i<musics.length; i++){
		if(name==musics[i].name){
			buscado=i;
			musics[i]=nueva;
			console.log("Modified");
			res.sendStatus(200);
			break;
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
}

//get load patri
module.exports.getLoadInitialData=function(req,res){
	initial_musics=[{"name": "Frio", "author": "Maria Parrado"},
	{"name": "Te dejo en libertad", "author": "Ha-Ash"}];
	musics=initial_musics;
	res.sendStatus(200);
}