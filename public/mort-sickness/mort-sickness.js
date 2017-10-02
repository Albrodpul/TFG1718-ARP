var service = '../../../api/v1/mort-sickness';
//Funcionalidades

//GET
function verTodos(){
    console.log("JQuery Ready!");    
      $("#log").text("Sending request...");
      var dir="";
      if($("#limit").val()!='' && $("#offset").val()!=''){
        dir=service + "?apikey=" + $("#apikey").val() + "&limit=" + $("#limit").val() + "&offset=" + $("#limit").val()*($("#offset").val()-1);
      }

      var request = $.ajax({
        url: dir,
        type: "GET",
        data: "{}",
        contentType: "application/json"
      })
      request.done(function(data,status,jqXHR){       
        $("#sickness").html(imprime(data));
      })
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text( "Insert a correct apikey");
        	}else if(statusCode == 402){
        		$("#status").text("Insert a correct apikey");
            }
        }else{
            $("#status").text("OK");
        }
      })
       function imprime(data){
       	$.each(data,function(i,item){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
                    $.each(data, function(i,item){
                    trHTML += '<tr><td>' + 
                    data[i].region + '</td><td>' + 
                    data[i].sickness + '</td><td>' + 
                    data[i].year + '</td><td>' + 
                    data[i].mortalityInMen + '</td><td>' + 
                    data[i].mortalityInWomen + '</td><td>' +
                    data[i].totalMortality + '</td></tr>'; 
                    });
                 $('#sickness').append(trHTML); 
               })
            }   
    }
   
//LoadInitialData
function cargaInicial(){
	$('#log').text("Sending request...");
	var request = $.ajax({
		url: service + '/loadInitialData?apikey=' + $('#apikey').val(),
		type: "GET",
		contentType: "application/json"
	})
	request.done(function(data, status, jqXHR){
	})
	request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text("Insert a correct apikey");
        	}else if(statusCode == 402){
        		$("#status").text("Insert a correct apikey");
            }
        }else{
            $("#status").text("OK");
        }
      })
};

//POST
function nuevo(){
      $("#log").text("Sending request...");
     
      var request = $.ajax({
        url: service +  "?apikey=" + $('#apikey').val(),
        type: "POST",
        data: '{"region":"'+$("#region").val()+'","sickness":"'+$("#sick").val()+'","year":"'+$("#year").val()+'","mortalityInMen":"'+$("#mortalityInMen").val()+'","mortalityInWomen":"'+$("#mortalityInWomen").val()+ '","totalMortality":"'+$("#totalMortality").val() + '"}',
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){    
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text("Insert a correct apikey");
        	}else if(statusCode == 402){
        		$("#status").text("Insert a correct apikey");
            }else if(statusCode == 400){
            	$("#status").text("Missing parameters");
            }else if(statusCode == 409){
            	$("#status").text("Data exist");
            }
        }else{
            $("#status").text("OK");
        }
      })     
}

//PUT
function actualizar(){ 
      $("#log").text("Sending request...");
     
      var request = $.ajax({
        url: service + "/" + $("#region").val() + "/" + $("#year").val() + "/" + "?apikey=" + $('#apikey').val(),
        type: "PUT",
        data: '{"region":"'+$("#region").val()+'","sickness":"'+$("#sick").val()+'","year":"'+$("#year").val()+'","mortalityInMen":"'+$("#mortalityInMen").val()+'","mortalityInWomen":"'+$("#mortalityInWomen").val()+ '","totalMortality":"'+$("#totalMortality").val() + '"}',
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){ 
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text("Insert a correct apikey");
        	}else if(statusCode == 402){
        		$("#status").text("Insert a correct apikey");
            }else if(statusCode == 400){
            	$("#status").text("Missing parameters");
            }else if(statusCode == 404){
            	$("#status").text("Data not exist");
            }
        }else{
            $("#status").text("OK");
        }
      })   
}
//DELETE UN DATO
function eliminarDato(){     
      var request = $.ajax({
        url: service + "/" + $("#region").val() + "/" + $("#year").val() + "/" + "?apikey=" + $('#apikey').val(),
        type: "DELETE",
		    data: "{}",
        contentType: "application/json"
      })
      request.done(function(data,status,jqXHR){  
      })
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text("Insert a correct apikey");
        	}else if(statusCode == 402){
        		$("#status").text("Insert a correct apikey");
            }else if(statusCode == 404){
            	$("#status").text("Data not exist");
            }
        }else{
            $("#status").text("OK");
            
        }
      })  
}

//Eliminar todo
function eliminarTodo(){    
      var request = $.ajax({
        url: service + "/" + "?apikey=" + $('#apikey').val(),
        type: "DELETE",
		    data: "{}",
        contentType: "application/json"
      })
      request.done(function(data,status,jqXHR){ 
      $("#sickness").html(imprime(data));   
      })
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text("Insert a correct apikey");
        	}else if(statusCode == 402){
        		$("#status").text("Insert a correct apikey");
            }
        }else{
            $("#status").text("OK");


        }
      })
      function imprime(data){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
              $("#sickness").append(trHTML);
            }
      
}

//Busqueda
function buscar(){
  var dir;
  if($("#region1").val()!=''  && $("#from").val()=='' && $("#to").val()==''){
    dir= service + "/" + $("#region1").val() + "/" + "?apikey=" + $("#apikey").val()+ "&limit=" + $("#limit").val() + "&offset=" + $("#limit").val()*($("#offset").val()-1);
  }else if($("#region1").val()=='' && $("#from").val()=='' && $("#to").val()==''){
    dir= service + "/" + "?apikey=" + $("#apikey").val()+ "&limit=" + $("#limit").val() + "&offset=" + $("#limit").val()*($("#offset").val()-1);
  }else if($("#region1").val()=='' && $("#from").val()!='' && $("#to").val()==''){
    dir= service + "/" + "?apikey=" + $("#apikey").val()+ "&limit=" + $("#limit").val() + "&offset=" + $("#limit").val()*($("#offset").val()-1) + "&from=" + $("#from").val(); 
  }else if($("#region1").val()==''  && $("#from").val()!='' && $("#to").val()!=''){
    dir= service + "/" + "?apikey=" + $("#apikey").val()+ "&limit=" + $("#limit").val() + "&offset=" + $("#limit").val()*($("#offset").val()-1) + "&from=" + $("#from").val() + "&to=" + $("#to").val(); 
  }else if($("#region1").val()!=''&& $("#from").val()!='' && $("#to").val()!=''){
    dir= service + "/" + $("#region1").val() + "/" + "?apikey=" + $("#apikey").val()+ "&limit=" + $("#limit").val() + "&offset=" + $("#limit").val()*($("#offset").val()-1) + "&from=" + $("#from").val() + "&to=" + $("#to").val(); 
  }

      var request = $.ajax({
        url: dir,
        type: "GET",
        data: "{}",
        contentType: "application/json"
      })

      request.done(function(data,status,jqXHR){    
        $("#sickness").html(imprime(data));
      })
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
          if(statusCode == 401){
              $("#status").text("Insert a correct apikey");
          }else if(statusCode == 402){
            $("#status").text("Insert a correct apikey");
            }else if(statusCode==404){
              $("#status").text("Data not exist");
              $("#sickness").empty();
               var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
              $("#sickness").append(trHTML);
            }
        }else{
            $("#status").text("OK");
        }
      })
       function imprime(data){
        $.each(data,function(i,item){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
                    $.each(data, function(i,item){
                    trHTML += '<tr><td>' + 
                    data[i].region + '</td><td>' + 
                    data[i].sickness + '</td><td>' + 
                    data[i].year + '</td><td>' + 
                    data[i].mortalityInMen + '</td><td>' + 
                    data[i].mortalityInWomen + '</td><td>' +
                    data[i].totalMortality + '</td></tr>'; 
                    });
                 $('#sickness').append(trHTML); 
               })
            }    
    }

function pagination(){
    var request= $.ajax(
    {
        type: "GET",
        url: service + '?apikey=' + $("#apikey").val() + '&limit='+ $("#limit").val() +'&offset='+ $("#limit").val()*($("#offset").val()-1),
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
      })
    request.always(function(jqXHR,status,error){
          if(error){
            if(jqXHR.status == 401){
                $("#status").text("Insert an apikey");
            }else if(jqXHR.status == 402){
                $("#status").text("Incorrect apikey");
            }else if(jqXHR.status == 404){
               $("#status").text("Data not found");
               $("#sickness").empty();
                var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
                $("#sickness").append(trHTML);
            }
          }else if(jqXHR.status == 200){
               $("#status").text("OK");
               $.each(data, function (i, item) {
                var trHTML='';
                trHTML+= "<tr><td>" + data[i].region + '</td><td>' + data[i].sickness + '</td><td>' + data[i].year + '</td><td>' + data[i].mortalityInMen + '</td><td>' + data[i].mortalityInWomen + '</td><td>' + data[i].totalMortality + '</td></tr>';
          })
            }
        })   
}

//Estilo
$(document).ready(function(){
	$('#miBoton').jqxButton({
		theme: 'shinyblack'
	})
});

$(document).ready(function(){
	$('#miBotonInicial').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#GET').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#apikey').jqxInput();
});

$(document).ready(function(){
	$('#buscar').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#DELETE').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#PUT').jqxButton({
		theme:'darkblue'
	})
});
$(document).ready(function(){
	$('#POST').jqxButton({
		theme:'darkblue'
	})
});
$(document).ready(function(){
	$('#DELETEDATO').jqxButton({
		theme:'darkblue'
	})
});