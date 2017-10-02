$(function(){
    // nothing here , but you can call someFunc() if you want
});

//Delete de un elemento
function deleteItemAux(j){
  console.log("He llegado hasta aux()",j);
  var request=$.ajax({
      type: "GET",
      url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&offset='+$("#offset").val()*$("#limit").val()+'&limit='+$("#limit").val()+'&from='+$("#from").val()+'&to='+$("#to").val(),
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      });
      request.done(function(data,status,jqXHR){
      var valor;
          $.each(data, function(i,item){
              if(data[i].region==data[j].region && data[i].year == data[j].year){
                console.log(data[j]);
                console.log(data[i]);
                console.log("catch data");
                region=data[i].region;
                year=data[i].year;
                console.log(region, year);
                var request = $.ajax({
                  url: "../../../api/v1/spain-births/"+region+"/"+year+"?apikey="+$("#apikey").val(),
                  type: "DELETE",
                  data: $("#payload").val(),
                  contentType: "application/json"
                });
                request.done(function(data,status,jqXHR){
                  console.log("Handling request (OK)");
                  console.log("Data received: ");
                  console.log(JSON.stringify(data));
                  var statusCode = jqXHR.status;
                  var statusCodeText = jqXHR.statusText;
                  $("#log").text("Data received");
                  $("#status5").text("Data deleted correctly");
                  $("#status2").show();
                  $("#status1").hide();
                  $("#status3").hide();
                  console.log("Status: "+statusCode+ " " +statusCodeText);
                  console.log($("#url"));
                  refresh();
                });
                request.always(function(jqXHR, status){
                  var statusCode = jqXHR.status;
                  var statusCodeText = jqXHR.statusText;
                  if (status == "error"){
                    if(statusCode==401){
                      $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
                      $("#offsetAux").hide();
                    }
                    else if(statusCode==402){
                      $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
                      $("#offsetAux").hide();
                    }else if(statusCode==429){
                      $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
                      $("#offsetAux").hide();
                    }
                      $("#status3").show();
                      $("#status1").hide();
                      $("#status2").hide();
                      $("#log").text("");
                      console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
                  }else{
                      $("#txtStatus").text(status);
                  }
                });
                return false;
              }
          });
    });
    request.always(function(jqXHR, status){
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      if (status == "error"){
        if(statusCode==401){
          $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
          $("#offsetAux").hide();
        }
        else if(statusCode==402){
          $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
          $("#offsetAux").hide();
        }else if(statusCode==429){
          $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
          $("#offsetAux").hide();
        }
          $("#status3").show();
          $("#status1").hide();
          $("#status2").hide();
          $("#log").text("");
          console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
      }else{
          $("#txtStatus").text(status);
      }
    });
}

//Put de un elemento
function putAux(j){
  console.log("He llegado hasta aux()");
  var request = $.ajax({
      type: "GET",
      url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&offset='+$("#offset").val()*$("#limit").val()+'&limit='+$("#limit").val()+'&from='+$("#from").val()+'&to='+$("#to").val(),
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json"
      });
      request.done(function(data,status,jqXHR){
      var valor;
          $.each(data, function(i,item){
              if(data[i].region==data[j].region && data[i].year == data[j].year){
                console.log("catch data");
                region=data[i].region;
                year=data[i].year;
                console.log(region, year);
                var request = $.ajax({
                  url: "../../../api/v1/spain-births/"+region+"/"+year+"?apikey="+$("#apikey").val(),
                  type: "PUT",
                  data: '{"region":"'+$("#region2").val()+'","year":'+$("#year2").val()+',"men":'+$("#men").val()+',"women":'+$("#women").val()+',"totalbirth":'+$("#totalbirth").val()+'}',
                  contentType: "application/json"
                });
                request.done(function(data,status,jqXHR){
                  console.log("Handling request (OK)");
                  console.log("Data received: ");
                  console.log(JSON.stringify(data));
                  var statusCode = jqXHR.status;
                  var statusCodeText = jqXHR.statusText;
                  $("#status5").text("Data updated correctly");
                  $("#status2").show();
                  $("#status1").hide();
                  $("#status3").hide();
                  console.log("Status: "+statusCode+ " " +statusCodeText);
                  console.log($("#url"));
                  refresh();
                });
                request.always(function(jqXHR, status){
                  var statusCode = jqXHR.status;
                  var statusCodeText = jqXHR.statusText;
                  if (status == "error"){
                    if(statusCode==401){
                      $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
                    }
                    else if(statusCode==402){
                      $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
                    }else if(statusCode==429){
                      $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
                    }
                    else if(statusCode==400){
                      $("#status6").text("Wrong fields: you need to add something in the inputs above!");
                    }
                     $("#status3").show();
                      $("#status1").hide();
                      $("#status2").hide();
                      $("#log").text("");
                      console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
                  }else{
                      $("#txtStatus").text(status);
                  }
                });
                return false;
              }
          });
    });
    request.always(function(jqXHR, status){
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      if (status == "error"){
          $("#status6").text(statusCode +" "+statusCodeText);
          $("#status3").show();
          $("#status1").hide();
          $("#status2").hide();
          $("#log").text("");
          console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
      }else{
          $("#txtStatus").text(status);
      }
    });
}


//POST
function addBirth(){
  console.log("Handling click");
  $("#log").text("Sending request...");

  var request = $.ajax({
    url: "../../../api/v1/spain-births?apikey="+$("#apikey").val(),
    type: "POST",
    data: '{"region":"'+$("#region2").val()+'","year":'+$("#year2").val()+',"men":'+$("#men").val()+',"women":'+$("#women").val()+',"totalbirth":'+$("#totalbirth").val()+'}',
    contentType: "application/json"
  });
  request.done(function(data,status,jqXHR){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    console.log(JSON.stringify(data));
    var statusCode = jqXHR.status;
    var statusCodeText = jqXHR.statusText;
    $("#log").text("Data received");
    $("#status5").text("Data added correctly");
    $("#status2").show();
    $("#status1").hide();
    $("#status3").hide();
    console.log("Status: "+statusCode+ " " +statusCodeText);
    refresh();
  });
  request.always(function(jqXHR, status){
    var statusCode = jqXHR.status;
    var statusCodeText = jqXHR.statusText;
    if (status == "error"){
      if(statusCode==401){
        $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
      }
      else if(statusCode==402){
        $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
      }else if(statusCode==429){
        $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
      }
      else if(statusCode==409){
        $("#status6").text("Data already exists");
      }
      else if(statusCode==400){
        $("#status6").text("Wrong fields: you need to add something in the inputs above!");
      }
      $("#status3").show();
        $("#status1").hide();
        $("#status2").hide();
        $("#log").text("");
        console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
    }else{
        $("#txtStatus").text(status);
    }
  });
}

//Refrescar2
function refresh(){
  var request =$.ajax({
    type: "GET",
    url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&from='+$("#from").val()+'&to='+$("#to").val(),
    data: "{}",
    data: $("#payload").val(),
    contentType: "application/json"
  });
  request.done(function(data,status,jqXHR){
    console.log("Handling request (OK)");
    console.log("Data received: ");
    console.log(JSON.stringify(data));
    var statusCode = jqXHR.status;
    var statusCodeText = jqXHR.statusText;
    $("#log").text("Data received");
    console.log(data.length);
    if(data.length<=$("#limit").val()){
      console.log(data.length);
      $("#offsetAux").hide();
    }else {
      $("#offsetAux").show();
      var offsetOptions = '';
      $('#offset').empty();
      for(i=0;i<(data.length/$("#limit").val());i++){
        console.log("Entro al bucle de pagination");
        offsetOptions+='<option value="'+i+'">'+(i+1)+'</option>';
      }
      $('#offset').append(offsetOptions);
      $("#offset").css("display", "block");
    }
    $("#status2").show();
    $("#status3").hide();
    $("#status1").hide();
    console.log("Status: "+statusCode+ " " +statusCodeText);

  var request =$.ajax({
    type: "GET",
    url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&limit='+$("#limit").val()+'&from='+$("#from").val()+'&to='+$("#to").val(),
    data: "{}",
    data: $("#payload").val(),
    contentType: "application/json"
  });
    request.done(function(data,status,jqXHR){
      console.log($("#offset").val());
      console.log("Handling request (OK)");
      console.log("Data received: ");
      console.log(JSON.stringify(data));
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      $("#log").text("Data received");
      //$("#status5").text(statusCode+": Correct request");
      $("#status2").show();
      $("#status3").hide();
      $("#status1").hide();
      $("#data").html(imprime(data));
      console.log("Status: "+statusCode+ " " +statusCodeText);
    });
    request.always(function(jqXHR, status){
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      if (status == "error"){
        if(statusCode==401){
          $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
          $("#offsetAux").hide();
        }
        else if(statusCode==402){
          $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
          $("#offsetAux").hide();
        }else if(statusCode==429){
          $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
          $("#offsetAux").hide();
        }
          $("#data").text("");
          $("#log").text("");
          console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
      }else{
          $("#txtStatus").text(status);
      }
    });
    function imprime(data){
        $('#data').empty();
        var trHTML = '';
        trHTML += '<tr class="#42a5f5 card-panel blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total birth</th><th class="center-align white-text centered" colspan="2">Actions</th></tr>';
        trHTML += '<tr><td class="center-align"><input type="text" name="payload" id="region2" placeholder="region"/></td>';
        trHTML += '<td class="center-align"><input type="text" name="payload" id="year2" placeholder="year"/></td>';
        trHTML += '<td class="center-align"><input type="text" name="payload" id="men" placeholder="men"/></td>';
        trHTML += '<td class="center-align"><input type="text" name="payload" id="women" placeholder="women"/></td>';
        trHTML += '<td class="center-align"><input type="text" name="payload" id="totalbirth" placeholder="totalbirth"/></td>';
        trHTML += '<td class="center-align" colspan="2"><button onclick="add()" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button></td></tr>';
              $.each(data, function(i,item){
                  trHTML += '<tr><td class="center-align">' +
                  data[i].region + '</td><td class="center-align">' +
                  data[i].year + '</td><td class="center-align">' +
                  data[i].men + '</td><td class="center-align">' +
                  data[i].women + '</td><td class="center-align">' +
                  data[i].totalbirth + '</td><td class="center-align">' +
                  '<button class="btn-floating btn-large waves-effect waves-light #f44336 red" onclick="deleteItem(' + i + ')"><i class="material-icons">delete</i></button></td>' +
                  '<td class="center-align"><button class="btn-floating btn-large waves-effect waves-light purple" onclick="put(' + i + ')"><i class="material-icons">mode_edit</i></button></td></tr>'
              });
        $('#data').append(trHTML);
      }

  });
  request.always(function(jqXHR, status){
    var statusCode = jqXHR.status;
    var statusCodeText = jqXHR.statusText;
    if (status == "error"){
      if(statusCode==401){
        $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
        $("#offsetAux").hide();
      }
      else if(statusCode==402){
        $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
        $("#offsetAux").hide();
      }else if(statusCode==429){
        $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
        $("#offsetAux").hide();
      }
        $("#data").text("");
        $("#log").text("");
        console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
    }else{
        $("#txtStatus").text(status);
    }
  });
}

//Llamadas en JavaScript puro
function put(algo){
      putAux(algo); // works!
}

function deleteItem(algo){
    deleteItemAux(algo); // works!
}
function add(){
  addBirth();
}

//Código jQuery!
$(document).ready(function(){
  $("#status2").hide();
  $("#status3").hide();
  $("#limit").css("display","block");
  $("#apikey").css("display","block");
  $('select').material_select('destroy');



  jQuery.support.cors = true;

//Refrescar
  function refresh(){
    var request =$.ajax({
      type: "GET",
      url: '../../../api/v1/spain-births?apikey='+$("#apikey").val(),
      data: "{}",
      data: $("#payload").val(),
      contentType: "application/json"
    });
    request.done(function(data,status,jqXHR){
      console.log("Handling request (OK)");
      console.log("Data received: ");
      console.log(JSON.stringify(data));
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      $("#log").text("Data received");
      console.log(data.length);
      if(data.length<=$("#limit").val()){
        console.log(data.length);
        $("#offsetAux").hide();
      }else {
        $("#offsetAux").show();
        var offsetOptions = '';
        $('#offset').empty();
        for(i=0;i<(data.length/$("#limit").val());i++){
          console.log("Entro al bucle de pagination");
          offsetOptions+='<option value="'+i+'">'+(i+1)+'</option>';
        }
        $('#offset').append(offsetOptions);
        $("#offset").css("display", "block");
      }
      $("#status2").show();
      $("#status3").hide();
      $("#status1").hide();
      console.log("Status: "+statusCode+ " " +statusCodeText);

    var request =$.ajax({
      type: "GET",
      url: '../../../api/v1/spain-births?apikey='+$("#apikey").val()+'&limit=3',
      data: "{}",
      data: $("#payload").val(),
      contentType: "application/json"
    });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status3").show();
            if(statusCode==401){
              $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
              $("#offsetAux").hide();
            }
            else if(statusCode==402){
              $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
              $("#offsetAux").hide();
            }else if(statusCode==429){
              $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
              $("#offsetAux").hide();
            }
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 card-panel blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total birth</th><th class="center-align white-text centered" colspan="2">Actions</th></tr>';
          trHTML += '<tr><td class="center-align"><input type="text" name="payload" id="region2" placeholder="region"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="year2" placeholder="year"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="men" placeholder="men"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="women" placeholder="women"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="totalbirth" placeholder="totalbirth"/></td>';
          trHTML += '<td class="center-align" colspan="2"><button onclick="add()" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button></td></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td class="center-align">' +
                    data[i].region + '</td><td class="center-align">' +
                    data[i].year + '</td><td class="center-align">' +
                    data[i].men + '</td><td class="center-align">' +
                    data[i].women + '</td><td class="center-align">' +
                    data[i].totalbirth + '</td><td class="center-align">' +
                    '<button class="btn-floating btn-large waves-effect waves-light #f44336 red" onclick="deleteItem(' + i + ')"><i class="material-icons">delete</i></button></td>' +
                    '<td class="center-align"><button class="btn-floating btn-large waves-effect waves-light purple" onclick="put(' + i + ')"><i class="material-icons">mode_edit</i></button></td></tr>';
                });

          $('#data').append(trHTML);
        }

    });
    request.always(function(jqXHR, status){
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      if (status == "error"){
          $("#status3").show();
          if(statusCode==401){
            $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
            $("#offsetAux").hide();
          }
          else if(statusCode==402){
            $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
            $("#offsetAux").hide();
          }else if(statusCode==429){
            $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
            $("#offsetAux").hide();
          }
          $("#status2").hide();
          $("#status1").hide();
          $("#data").text("");
          $("#log").text("");
          console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
      }else{
          $("#txtStatus").text(status);
      }
    });
  }


refresh();
var url;
direccion();

//GET de la lista completa
    console.log("JQuery Ready!");
    $("#GET").click(function(){
      console.log("Handling click");
      $("#log").text("Sending request...");
      var request = $.ajax({
        url: '../../../api/v1/spain-births?apikey='+$("#apikey").val(),
        type: "GET",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Correct request");
        console.log(data.length);
        $("#region").val("");
        $("#year").val("");
        $("#from").val("");
        $("#to").val("");
        if(data.length<=$("#limit").val()){
          console.log(data.length);
          $("#offsetAux").hide();
        }else {
          $("#offsetAux").show();
          var offsetOptions = '';
          $('#offset').empty();
          for(i=0;i<(data.length/$("#limit").val());i++){
            console.log("Entro al bucle de pagination");
            offsetOptions+='<option value="'+i+'">'+(i+1)+'</option>';
          }
          $('#offset').append(offsetOptions);
          $("#offset").css("display", "block");
        }
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        console.log("Status: "+statusCode+ " " +statusCodeText);

      var request = $.ajax({
        url: '../../../api/v1/spain-births?apikey='+$("#apikey").val()+'&limit='+$("#limit").val(),
        type: "GET",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Correct request");
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        if (status == "error"){
            $("#status3").show();
            if(statusCode==401){
              $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
              $("#offsetAux").hide();
            }
            else if(statusCode==402){
              $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
              $("#offsetAux").hide();
            }else if(statusCode==429){
              $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
              $("#offsetAux").hide();
            }
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 card-panel blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total birth</th><th class="center-align white-text centered" colspan="2">Actions</th></tr>';
          trHTML += '<tr><td class="center-align"><input type="text" name="payload" id="region2" placeholder="region"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="year2" placeholder="year"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="men" placeholder="men"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="women" placeholder="women"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="totalbirth" placeholder="totalbirth"/></td>';
          trHTML += '<td class="center-align" colspan="2"><button onclick="add()" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button></td></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td class="center-align">' +
                    data[i].region + '</td><td class="center-align">' +
                    data[i].year + '</td><td class="center-align">' +
                    data[i].men + '</td><td class="center-align">' +
                    data[i].women + '</td><td class="center-align">' +
                    data[i].totalbirth + '</td><td class="center-align">' +
                    '<button class="btn-floating btn-large waves-effect waves-light #f44336 red" onclick="deleteItem(' + i + ')"><i class="material-icons">delete</i></button></td>' +
                    '<td class="center-align"><button class="btn-floating btn-large waves-effect waves-light purple" onclick="put(' + i + ')"><i class="material-icons">mode_edit</i></button></td></tr>';
                });
          $('#data').append(trHTML);
        }
    });
  request.always(function(jqXHR, status){
    var statusCode = jqXHR.status;
    if (status == "error"){
        $("#status3").show();
        if(statusCode==401){
          $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
          $("#offsetAux").hide();
        }
        else if(statusCode==402){
          $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
          $("#offsetAux").hide();
        }else if(statusCode==429){
          $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
          $("#offsetAux").hide();
        }
        $("#status2").hide();
        $("#status1").hide();
        $("#data").text("");
        $("#log").text("");
        console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
    }else{
        $("#txtStatus").text(status);
    }
  });
});
//search (region, year, from, to)
    function search(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&from='+$("#from").val()+'&to='+$("#to").val(),
        type: "GET",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Correct request");
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        console.log(data.length);
        if(data.length<=$("#limit").val()){
          console.log(data.length);
          $("#offsetAux").hide();
        }else {
          $("#offsetAux").show();
          var offsetOptions = '';
          $('#offset').empty();
          for(i=0;i<(data.length/$("#limit").val());i++){
            console.log("Entro al bucle de pagination");
            offsetOptions+='<option value="'+i+'">'+(i+1)+'</option>';
          }
          $('#offset').append(offsetOptions);
          $("#offset").css("display", "block");
        }
        console.log("Status: "+statusCode+ " " +statusCodeText);

      var request = $.ajax({
        url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&limit='+$("#limit").val()+'&from='+$("#from").val()+'&to='+$("#to").val(),
        type: "GET",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Correct request");
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status3").show();
            if(statusCode==401){
              $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
              $("#offsetAux").hide();
            }
            else if(statusCode==402){
              $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
              $("#offsetAux").hide();
            }else if(statusCode==429){
              $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
              $("#offsetAux").hide();
            }
            else if(statusCode==404){
              $("#status6").text("Data not found");
              $("#offsetAux").hide();
            }
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 card-panel blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total birth</th><th class="center-align white-text centered" colspan="2">Actions</th></tr>';
          trHTML += '<tr><td class="center-align"><input type="text" name="payload" id="region2" placeholder="region"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="year2" placeholder="year"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="men" placeholder="men"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="women" placeholder="women"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="totalbirth" placeholder="totalbirth"/></td>';
          trHTML += '<td class="center-align" colspan="2"><button onclick="add()" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button></td></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td class="center-align">' +
                    data[i].region + '</td><td class="center-align">' +
                    data[i].year + '</td><td class="center-align">' +
                    data[i].men + '</td><td class="center-align">' +
                    data[i].women + '</td><td class="center-align">' +
                    data[i].totalbirth + '</td><td class="center-align">' +
                    '<button class="btn-floating btn-large waves-effect waves-light #f44336 red" onclick="deleteItem(' + i + ')"><i class="material-icons">delete</i></button></td>' +
                    '<td class="center-align"><button class="btn-floating btn-large waves-effect waves-light purple" onclick="put(' + i + ')"><i class="material-icons">mode_edit</i></button></td></tr>'
                });
          $('#data').append(trHTML);
        }
    });
    request.always(function(jqXHR, status){
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      if (status == "error"){
          $("#status3").show();
          if(statusCode==401){
            $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
            $("#offsetAux").hide();
          }
          else if(statusCode==402){
            $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
            $("#offsetAux").hide();
          }else if(statusCode==429){
            $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
            $("#offsetAux").hide();
          }
          else if(statusCode==404){
            $("#status6").text("Data not found");
            $("#offsetAux").hide();
          }
          $("#status2").hide();
          $("#status1").hide();
          $("#data").text("");
          $("#log").text("");
          console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
      }else{
          $("#txtStatus").text(status);
      }
    });
  }

//limit
    function entry(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&from='+$("#from").val()+'&to='+$("#to").val(),
        type: "GET",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Correct request");
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        console.log(data.length);
        if(data.length<=$("#limit").val()){
          console.log(data.length);
          $("#offsetAux").hide();
        }else {
          $("#offsetAux").show();
          var offsetOptions = '';
          $('#offset').empty();
          for(i=0;i<(data.length/$("#limit").val());i++){
            console.log("Entro al bucle de pagination");
            offsetOptions+='<option value="'+i+'">'+(i+1)+'</option>';
          }
          $('#offset').append(offsetOptions);
          $("#offset").css("display", "block");
        }
        console.log("Status: "+statusCode+ " " +statusCodeText);

      var request = $.ajax({
        url: '../../../api/v1/spain-births/'+$("#region").val()+'/'+$("#year").val()+'?apikey='+$("#apikey").val()+'&from='+$("#from").val()+'&to='+$("#to").val()+'&limit='+$("#limit").val(),
        type: "GET",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Correct request");
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
          if(statusCode==401){
            $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
            $("#offsetAux").hide();
          }
          else if(statusCode==402){
            $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
            $("#offsetAux").hide();
          }else if(statusCode==429){
            $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
            $("#offsetAux").hide();
          }else if(statusCode==404){
              $("#status6").text("Data not found");
              $("#offsetAux").show();
            }
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 card-panel blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total birth</th><th class="center-align white-text centered" colspan="2">Actions</th></tr>';
          trHTML += '<tr><td class="center-align"><input type="text" name="payload" id="region2" placeholder="region"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="year2" placeholder="year"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="men" placeholder="men"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="women" placeholder="women"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="totalbirth" placeholder="totalbirth"/></td>';
          trHTML += '<td class="center-align" colspan="2"><button onclick="add()" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button></td></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td class="center-align">' +
                    data[i].region + '</td><td class="center-align">' +
                    data[i].year + '</td><td class="center-align">' +
                    data[i].men + '</td><td class="center-align">' +
                    data[i].women + '</td><td class="center-align">' +
                    data[i].totalbirth + '</td><td class="center-align">' +
                    '<button class="btn-floating btn-large waves-effect waves-light #f44336 red" onclick="deleteItem(' + i + ')"><i class="material-icons">delete</i></button></td>' +
                    '<td class="center-align"><button class="btn-floating btn-large waves-effect waves-light purple" onclick="put(' + i + ')"><i class="material-icons">mode_edit</i></button></td></tr>'
                });
          $('#data').append(trHTML);
        }
    });
    request.always(function(jqXHR, status){
      var statusCode = jqXHR.status;
      var statusCodeText = jqXHR.statusText;
      if (status == "error"){
          $("#status3").show();
          if(statusCode==401){
            $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
            $("#offsetAux").hide();
          }
          else if(statusCode==402){
            $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
            $("#offsetAux").hide();
          }else if(statusCode==429){
            $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
            $("#offsetAux").hide();
          }else if(statusCode==404){
            $("#status6").text("Data not found");
            $("#offsetAux").hide();
          }
          $("#status2").hide();
          $("#status1").hide();
          $("#data").text("");
          $("#log").text("");
          console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
      }else{
          $("#txtStatus").text(status);
      }
    });
  }

//offset
    function pagination(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var method=$("input[type=button]").val();
      var request = $.ajax({
        url: url,
        type: "GET",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Correct request");
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status3").show();
            if(statusCode==401){
              $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
              $("#offsetAux").hide();
            }
            else if(statusCode==402){
              $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
              $("#offsetAux").hide();
            }else if(statusCode==429){
              $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
              $("#offsetAux").hide();
            }
            else if(statusCode==404){
              $("#status6").text("Data not found");
            }
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 card-panel blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total birth</th><th class="center-align white-text centered" colspan="2">Actions</th></tr>';
          trHTML += '<tr><td class="center-align"><input type="text" name="payload" id="region2" placeholder="region"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="year2" placeholder="year"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="men" placeholder="men"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="women" placeholder="women"/></td>';
          trHTML += '<td class="center-align"><input type="text" name="payload" id="totalbirth" placeholder="totalbirth"/></td>';
          trHTML += '<td class="center-align" colspan="2"><button onclick="add()" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button></td></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td class="center-align">' +
                    data[i].region + '</td><td class="center-align">' +
                    data[i].year + '</td><td class="center-align">' +
                    data[i].men + '</td><td class="center-align">' +
                    data[i].women + '</td><td class="center-align">' +
                    data[i].totalbirth + '</td><td class="center-align">' +
                    '<button class="btn-floating btn-large waves-effect waves-light #f44336 red" onclick="deleteItem(' + i + ')"><i class="material-icons">delete</i></button></td>' +
                    '<td class="center-align"><button class="btn-floating btn-large waves-effect waves-light purple" onclick="put(' + i + ')"><i class="material-icons">mode_edit</i></button></td></tr>'
                });
          $('#data').append(trHTML);
        }
    }

//Cambio de URL para Search
$("input[name=apikey]").keyup(function(){
    direccion();
});

$("input[name=region]").keyup(function(){
    direccion();
    search();
});

$("input[name=year]").keyup(function(){
    direccion();
    search();
});

$("input[name=from]").keyup(function(){
    direccion();
    search();
});

$("input[name=to]").keyup(function(){
    direccion();
    search();
});

/*$("#region").change(function(){
    direccion();
    search();
});
$("#year").change(function(){
    direccion();
    search();
});*/
/*$("#apikey").change(function(){
    direccion();
});*/
$("#offset").change(function(){
    direccion();
    pagination();
});
$("#limit").change(function(){
    direccion();
    entry();
});
/*$("#from").change(function(){
    direccion();
    search();
});
$("#to").change(function(){
    direccion();
    search();
});*/

function direccion() {
    url=$("#url").val();
    if ($("#region").val() != "" && $("#region").val()!=null){
      url = url + "/" + $("#region").val()
    }
    if ($("#year").val() != "" && $("#year").val()!=null){
      url = url + "/" + $("#year").val()
    }
    if ($("#apikey").val() != ""){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "apikey=" + $("#apikey").val()
    }
    if ($("#offset").val() != "" && $("#offset").val()!=null){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "offset=" + ($("#offset").val()*$("#limit").val());
    }
    if ($("#limit").val() != "" && $("#limit").val()!=null){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "limit=" + $("#limit").val()
    }
    if ($("#from").val() != "" && $("#from").val()!=null){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "from=" + $("#from").val()
    }
    if ($("#to").val() != "" && $("#to").val()!=null){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "to=" + $("#to").val()
    }
    $("#url").text(url);
    $('#req').text(url);
  }

//Borra todo
    $("#DELETEAll").click(function(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: "../../../api/v1/spain-births?apikey="+$("#apikey").val(),
        type: "DELETE",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Data removed");
        $("#status2").show();
        $("#status1").hide();
        $("#status3").hide();
        $("#data").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
        refresh();
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
          if(statusCode==401){
            $("#status6").text("Apikey required");
            $("#offsetAux").hide();
          }
          if(statusCode==403){
            $("#status6").text("Invalid apikey");
            $("#offsetAux").hide();
          }
            $("#status3").show();
            $("#status1").hide();
            $("#status2").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
    });

//loadInitialData
    $("#LOAD").click(function(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: "../../../api/v1/spain-births/loadInitialData?apikey="+$("#apikey").val(),
        type: "GET",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status5").text("Data loaded correctly");
        $("#status2").show();
        $("#status1").hide();
        $("#status3").hide();
        console.log("Status: "+statusCode+ " " +statusCodeText);
        refresh();
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
          if(statusCode==401){
            $("#status6").html("Apikey required. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get an apikey.");
            $("#offsetAux").hide();
          }
          else if(statusCode==402){
            $("#status6").html("Invalid apikey. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get one.");
            $("#offsetAux").hide();
          }else if(statusCode==429){
            $("#status6").html("Requests exceeded. Click <a href='http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Falbrodpul%2FGovernify-API%2FPlans%2Fportal-config.json'>here</a> to get a better plan.");
            $("#offsetAux").hide();
          }
            $("#status3").show();
            $("#status1").hide();
            $("#status2").hide();
            $("#log").text("");
            $("#data").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
    });
  });
