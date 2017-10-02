var seleccionado = false;
var nuevoDato = true;


function IniciarTabla(data){
  
  
  

  var datos = data;          
               
  var table =  $('#tablaid').DataTable( {
    "data": datos,                  
    "columns": [
            { "title": "Region" },
            { "title": "Year" },
            { "title": "Age" },
            { "title": "Men"},
            { "title": "Women"},
            { "title": "Total population"}
    ],
        "bPaginate": false,
        "bFilter": false, 
        "bSort" : false
  
    } );
  return table;

                                                 
}

function procesarDatos(){
  //{"region":"Andalucia","year":"2010","age"="20-24","men"="10","women"="10", "totalpopulation"="20"}

  var dato = [];
  var res = [];

  
  var request = $.ajax({
    url: '../api/v1/population-growth?apikey=multiPlan_C4_sos-2016-03-asu_ag',
    type: "GET",
    async: false
  });
  request.always(function(data,status,jqXHR) {
      console.log(data);
      for(var i in data){
        console.log(i);
        var obj = data[i];
        console.log(obj);
        for(var prop in obj){
          console.log(prop);
          dato.push(obj[prop]);
        }
        res.push(dato);
        dato = [];
      }
      console.log(res);
  });
  return res; //Devuelve un array(res) de arrays(dato) con los datos que hay en ese momento en la api
}
/*
function seleccionarCelda(data){
  var table = data;
  $('#tablaid tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      seleccionado = false;
      $(this).removeClass('selected');
    }else{
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      seleccionado = true;
    }
    console.log(table.$('tr.selected'));
  } );  
}
*/
function vaciarCajas(){
  document.getElementById("region2").value = "";
  document.getElementById("year2").value = "";
  document.getElementById("age2").value = "";
  document.getElementById("men2").value = "";
  document.getElementById("women2").value = "";
  document.getElementById("totalpopulation2").value = "";
  document.getElementById("apikey2").value = "";
}

//La utilizo para saber que recurso tengo que borrar o editar de la api
/*function conseguirDato(){
  var table =  $('#tablaid').DataTable();
  var dato = table.row('.selected').data().toString();
  console.log("Fila sin trocear: "+dato);
  var campos = dato.split(",");
  console.log("Fila troceada: "+campos);
  return campos;
}
*/
//Se ejecuta segundo
function enviarDato(){
  var r= $("#region2").val()
  var y= $("#year2").val()
  var a= $("#age2").val()
  var m= $("#men2").val()
  var w= $("#women2").val()
  var t= $("#totalpopulation2").val()
  var datos='{"region":"'+r+'","year":"'+y+'","age":"'+a+'","men":"'+m+'","women":"'+w+'","total_population":"'+t+'"}';
  //var datos = "{'region':"+r+",'year':"+$("#year2").val()+",'age':"+$("#age2").val()+",'men':"+$("#men2").val()+",'women':"+$("#women2").val()+",'total_population:"+$("totalpopulation2").val()+"}";
    if(nuevoDato){
      console.log(datos);
      console.log(nuevoDato);
      console.log("Metodo POST");
      //Es un nuevo dato (añadir dato) POST
      var metodo = "POST";
      var url = '../api/v1/population-growth?apikey=' + $("#apikey2").val();
      solicitudAjax(metodo, url, datos);
      
    }else{
      console.log("Metodo PUT");
      var metodo = "PUT";
      var url = '../api/v1/population-growth/'+$("#region2").val()+'/'+$("#year2").val()+'?apikey='+$("#apikey2").val();
      solicitudAjax(metodo, url, datos);
    }
    //vaciarCajas();
}



function botonMenu(){
  $("#formulario2").slideUp();
  $("#tabla").slideDown();
  $("#botonDatos").addClass("active");
  vaciarCajas();  
}

//Se ejecuta primero
function botonAnadirDato(){
  $("#taba").slideDown();
  $("#formulario3").slideToggle();
  $("#formulario2").slideDown();
  
  seleccionado = false;
  $('tr.selected').removeClass('selected');
  $("#tituloFormulario").text("Add new:");
  nuevoDato = true;
  console.log("¿Es un nuevo dato?: "+nuevoDato);
  $("#region2").prop('disabled', false);
  $("#year").prop('disabled', false);
  $("#nav li").removeClass("active");
  $("#botonAnadirDato").addClass("active");
  vaciarCajas();
}
/*
function botonEditarDato(){
  nuevoDato = false;
  console.log("¿Es un nuevo Dato?: "+nuevoDato);
  if(seleccionado){
    $("#tabla").slideUp();
    $("#formulario2").slideDown();
    $("#tituloFormulario").text("Editar dato:");
    $("#nav li").removeClass("active");
    $("#botonEditarDato").addClass("active");
    var campos = conseguirDato();
    $("#region2").val(campos[0]);
    $("#region2").prop('disabled', true);
    console.log(campos[0]);
    $("#year2").val(campos[1]);
    $("#year2").prop('disabled', true);
    console.log(campos[1]);
    $("#age2").val(campos[2]);
    $("#men2").val(campos[3]);
    $("#women2").val(campos[4]);
    $("#totalpopulation2").val(campos[5]);
    $("#apikey2").val(campos[6]);
  }else{
    alertify.alert("No has seleccionado ningún dato");
  }
}


function botonEliminarDato(){
  if(seleccionado){
      var table =  $('#tablaid').DataTable();
      console.log(table);
      var campos = conseguirDato();
      var urlstring = '../api/v1/population-growth'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
  var x;
  if(seleccionado){
    alertify.confirm("¿Esta seguro de Eliminar el dato?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);
      var campos = conseguirDato();
      var urlstring = '../api/v1/population-growth'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      table.row('.selected').remove().draw( false );
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Se ha aceptado";
      alertify.alert("Dato borrado con exito.");
        }else{
      x = "Se ha cancelado";
        }});
  }else{
    alertify.alert("No has seleccionado ningún dato");
  } 
  console.log(x);
  //console.log("Dato borrado");
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("¡Dato añadido con exito!");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún parámetro para rellenar o el tipo esta mal.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" La entrada ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" NO coincide el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("No has seleccionado ningún dato");
}
}
*/
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
    table.rows().remove().draw(false);
    });
    x = "Se ha aceptado";
    
    console.log("Datos borrado");
    request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter or the type is incorrect");
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

function actualizarTabla(){
  var table =  $('#tablaid').DataTable();
  table.row.add( [
              $("#region2").val(),
              $("#year2").val(),
              $("#age2").val(),
              $("#men2").val(),
              $("#women2").val(),
              $("#totalpopulation2").val()
          ] ).draw();
  table.row('.selected').remove().draw( false );
}

function solicitudAjax(metodo, url, datos){
  var jqery
  var request = $.ajax({
    url: url,
    type: metodo,
    data: datos,
    contentType: "application/json"
  });
  request.done(function(data,status,jqXHR) {
    if(status == "success"){
    console.log(jqXHR);
    console.log(status);
    console.log("jqXHR : "+jqXHR);
    console.log("jqXHR status : "+jqXHR.status);
    console.log("texto codigo :"+jqXHR.statusText);
    console.log("status : "+status);
    alertify.alert("Data loaded", function () {
      location.reload();
  });
    actualizarTabla();
    vaciarCajas();
    if(metodo == "PUT"){
      botonMenu();
      seleccionado = false;
    }
    }
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data loaded", function () {
      location.reload();
  });
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter or the type is incorrect");
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

function cargaInicial(){
  var apikey = document.getElementById("apikey").value;
  var urlstring = '/api/v1/population-growth/loadInitialData?apikey=' + apikey
  var method = "GET";
  var request = $.ajax({
    url: urlstring,
    type: method,
    async: false
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
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

function paginacion() {
     var x = document.getElementById("limit").value;
     var busqueda= document.getElementById("busqueda").value;

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
var busqueda= document.getElementById("busqueda").value;
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

function busqueda(){

    var busqueda_region = document.getElementById("busqueda").value;
    var busqueda_from = document.getElementById("busqueda2").value;
    var busqueda_to = document.getElementById("busqueda3").value;
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
  var x;
 
    alertify.confirm("Are you sure?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);
      
      var urlstring = '../api/v1/population-growth'+'/'+region+'/'+year+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Se ha aceptado";
      alertify.alert("Deleted", function(){
        location.reload();
      });
        }else{
      x = "Cancelled";
        }});
 
  console.log(x);
  //console.log("Dato borrado");
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter or the type is incorrect");
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
  alertify.alert("Data no selected");
}

}

function editardato(){
    var region = document.getElementById("reg2").value;
    var year = document.getElementById("yea2").value;
    nuevoDato = false;
    console.log("¿Es un nuevo Dato?: "+nuevoDato);
    
   
    
  
 
  var metodo = "GET";
  var url = '../api/v1/population-growth/'+region+'/'+year+'?apikey='+$("#apikey").val();
    var request = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");

    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter or the type is Incorrect");
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
    
    $("#tabla").slideUp();
    $("#formulario2").slideDown();
    $("#tituloFormulario").text("Editar dato:");
    //$("#nav li").removeClass("active");
    //$("#botonEditarDato").addClass("active");
    $("#region2").val(region);
    $("#region2").prop('disabled', true);
    $("#year2").val(year);
    $("#year2").prop('disabled', true);
    
  });
  var r= $("#region2").val()
  var y= $("#year2").val()
  var a= $("#age2").val()
  var m= $("#men2").val()
  var w= $("#women2").val()
  var t= $("#totalpopulation2").val()
  var datos='{"region":"'+r+'","year":"'+y+'","age":"'+a+'","men":"'+m+'","women":"'+w+'","total_population":"'+t+'"}';
  var metodo = "PUT";
  var url = '../api/v1/population-growth/'+region+'/'+year+'?apikey='+$("#apikey").val();
    var request2 = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

}