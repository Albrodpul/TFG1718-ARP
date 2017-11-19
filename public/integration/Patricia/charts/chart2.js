google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawVisualization);

//Voy a comparar el total de mortalidad con el dopaje que se projueron en los Juegos Olímpicos (por año).

function drawVisualization(){
  $(document).ready(function(){
    var request=$.ajax({
      type:"GET",
      url:"../../../api/v1/mort-sickness?apikey=multiPlan_C4_sos-2016-03-pgs_ag",
      data: "{}",
          contentType: "application/json; charset=utf-8",
          dataType: "json"
    })
    request.done(function(data, status){
      var request1=$.ajax({
              type: "GET",
              url: 'https://sos-2016-05.herokuapp.com/api/v1/locations?apikey=multiPlan_C4_sos-2016-05-ajv_ag',
              data: "{}",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
            })
      request1.done(function(data1, status){
        var datos = [["Year","Total Mortality", "Doping"]];
        for(i=0;i<data.length;i++){
          for(j=0; j<data1.length; j++){
            if(data[i].year==data1[j].year){
              graf=data[i];
              graf1=data1[j];
              var grafForWidget=[Number(graf.year), Number(graf.totalMortality),Number(graf1.doping)];
              datos.push(grafForWidget);
            }
          }
        }
        var datosRecogidos = google.visualization.arrayToDataTable(datos);
        var options = {
             title : 'Total mortality and doping',
              vAxis: {title: 'Total mortality and doping'},
              hAxis: {title: 'Year'},
              seriesType: 'bars',
              series: {5: {type: 'line'}}
         }
          var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
         chart.draw(datosRecogidos, options);
      })
    })
  })
}