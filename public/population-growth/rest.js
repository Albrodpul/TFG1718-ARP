


var table;


$(document).ready(function() {
    table = $("#tablaid").DataTable({
        "ajax": {
            "url": "../api/v1/population-growth?apikey=multiPlan_C4_sos-2016-03-asu_ag",
            "dataSrc": ""
        },
        "columns": [
            { "data": "region" },
            { "data": "year" },
            { "data": "age" },
            { "data": "men" },
            { "data": "women" },
            { "data": "total_population" }


        ],
        "defaultContent": "Click to edit",
        "bPaginate": false,
        "bFilter": false, 
        "bSort" : false
    });

    $("#formulario").slideUp();
    $("#formulario2").slideUp();
});

function cargaInicial(){
  var apikey = document.getElementById("apikey").value;
  var urlstring = '/api/v1/population-growth/loadInitialData?apikey=' + apikey
  var method = "GET";
  var request = $.ajax({
    url: urlstring,
    type: method
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 402){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR) {
    
    console.log("Datos cargados");
    alertify.alert("Data loaded", function () {
      location.reload();
  });
  });
  
}

function botonEliminarTodo(){
 
  var x;
  
    var urlstring = '/api/v1/population-growth?apikey=' + $("#apikey").val();
    console.log($("#apikey").val());
    var method = "DELETE";
    var request = $.ajax({
      url: urlstring,
      type: method
    });
    request.success(function(status,jqXHR) {
    var table =  $('#tablaid').DataTable();
    table.rows().remove().draw(/*false*/);
    });    
    console.log("Datos borrado");
    request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");
    }
    if(jqXHR.status == 402){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: The entry exists");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  
}


function busqueda(){

    var busqueda_region = document.getElementById("busqueda_region").value;
    var busqueda_from = document.getElementById("busqueda_from").value;
    var busqueda_to = document.getElementById("busqueda_to").value;
    if(busqueda_from=='' && busqueda_to==''){
        urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val();
    }else if(busqueda_from=='' && busqueda_to!=''){
       urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&to=" + busqueda_to;
    }else if(busqueda_from!='' && busqueda_to==''){
       urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&from=" + busqueda_from;
    }else if(busqueda_from!='' && busqueda_to!='' && busqueda_region!=''){
      urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&from=" + busqueda_from + "&to=" + busqueda_to;
    }else if(busqueda_from!='' && busqueda_to!='' && busqueda_region==''){
      urlaux='/api/v1/population-growth/?apikey=' + $("#apikey").val() + "&from=" + busqueda_from + "&to=" + busqueda_to;
    }else if(busqueda_from=='' && busqueda_to!='' && busqueda_region==''){
      urlaux='/api/v1/population-growth/?apikey=' + $("#apikey").val() +  "&to=" + busqueda_to;
    }else{
      urlaux='/api/v1/population-growth/?apikey=' + $("#apikey").val() + "&from=" + busqueda_from ;
    }
    $.ajax(
    {
        type: "GET",
        //url: '/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&from=" + busqueda_from + "&to=" + busqueda_to,
        url: urlaux,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
          $("#tablaid tbody tr").remove();
          var trHTML = '';
          $.each(data, function (i, item) {
          console.log(data[i]);
          trHTML += "<tr class='info'><td>" + data[i].region + '</td><td>' + data[i].year + '</td><td>' + data[i].age + '</td><td>' + data[i].men + '</td><td>' + data[i].women + '</td><td>' + data[i].total_population + '</td></tr>';
        });

        $('#tablaid').append(trHTML);  



        },
        
        
        error: function(jqXHR,status){
          console
          if(jqXHR.status == 402){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 404){
              alertify.alert("Not found");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+"Server error");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);
           
        }
    });
}

function eliminardato(){
  var region = document.getElementById("reg").value;
  var year = document.getElementById("yea").value;

  if(region!='' && year!=''){
      var table =  $('#tablaid').DataTable();
      
      var urlstring = '../api/v1/population-growth'+'/'+region+'/'+year+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
    location.reload();
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");
    }
    if(jqXHR.status == 402){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: The entry exists");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("Missing parameter");
}

}

function botonEditarDato(){
  $("#formulario1").slideUp();
  $("#formulario2").slideDown();
}

function editarDato(){
  
  var region= $("#form2_region").val()
  var year= $("#form2_year").val()
  var age= $("#form2_age").val()
  var men= $("#form2_men").val()
  var women= $("#form2_women").val()
  var totalpopulation= $("#form2_totalpopulation").val()
  var datos='{"region":"'+region+'","year":"'+year+'","age":"'+age+'","men":"'+men+'","women":"'+women+'","total_population":"'+totalpopulation+'"}';
  var metodo = "PUT";
  var url = '../api/v1/population-growth/'+region+'/'+year+'?apikey='+$("#apikey").val();
  var request = $.ajax({
    url: url,
    type: metodo,
    data: datos,
    contentType: "application/json"
  });

  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");

    }
    if(jqXHR.status == 402){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: The entry exists");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR,data){
    location.reload();
  });
 

}

function botonAnadirDato(){
  $("#formulario").slideDown();
}

function añadirDato(){
  
  var region= $("#form_region").val()
  var year= $("#form_year").val()
  var age= $("#form_age").val()
  var men= $("#form_men").val()
  var women= $("#form_women").val()
  var totalpopulation= $("#form_totalpopulation").val()
  var datos='{"region":"'+region+'","year":"'+year+'","age":"'+age+'","men":"'+men+'","women":"'+women+'","total_population":"'+totalpopulation+'"}';
  var metodo = "POST";
  var url = '../api/v1/population-growth?apikey='+$("#apikey").val();
  var request = $.ajax({
    url: url,
    type: metodo,
    data: datos,
    contentType: "application/json"
  });

  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");

    }
    if(jqXHR.status == 402){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: The entry exists");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR,data){
    location.reload();
  });
 

}




function paginacion() {
     var x = document.getElementById("limit").value;
     var busqueda= document.getElementById("busqueda_region").value;

    $.ajax(
    {
        type: "GET",
        url: '/api/v1/population-growth'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+'0',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,

        success: function (data) {
          $("#tabla tbody tr").remove();
          
          var trHTML = '';

      
        

      $.each(data, function (i, item) {
        console.log(data[i]);
        
          trHTML += "<tr class='info'><td>" + data[i].region + '</td><td>' + data[i].year + '</td><td>' + data[i].age + '</td><td>' + data[i].men + '</td><td>' + data[i].women + '</td><td>' + data[i].total_population + '</td></tr>';
      });

      $('#tablaid').append(trHTML);  



        },
        
        error: function(jqXHR,status){
          console
          if(jqXHR.status == 402){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 404){
              alertify.alert("Not found. Not more data.");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+"Server error");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);
           
        }
    });
}

function paginacion2() {
var x = document.getElementById("limit").value;
var x2 = document.getElementById("pag").value;
//si x2=0 -> x3=0 (x2*x)
//si x2=1 -> x3=x1 (pag*limit -1)
//si x2=2 -> x3=
var x3= (x*x2);
var busqueda= document.getElementById("busqueda_region").value;
    $.ajax(
    {
        type: "GET",
        url: '/api/v1/population-growth/'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+x3,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,

        success: function (data) {
          $("#tabla tbody tr").remove();
          
          var trHTML = '';

      
        

      $.each(data, function (i, item) {
        console.log(data[i]);
        
          trHTML += "<tr class='info'><td>" + data[i].region + '</td><td>' + data[i].year + '</td><td>' + data[i].age + '</td><td>' + data[i].men + '</td><td>' + data[i].women + '</td><td>' + data[i].total_population + '</td></tr>';
      });

      $('#tablaid').append(trHTML);  



        },
        
        
        error: function(jqXHR,status){
          console
          if(jqXHR.status == 402){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 404){
              alertify.alert("Not found. Not more data");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+"Server error");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);
           
        }
    });
    


}