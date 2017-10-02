google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawVisualization);

//Voy a comparar el total de mortalidad (Comunidades autonomas de España) 
//con el total de co2 emitido en España(Region=spain) por el año.

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
              url: '../../../api/v1/co2/spain?apikey=multiPlan_C4_sos-2016-01-grc_ag',
              data: "{}",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
            })
      request1.done(function(data1, status){
        var datos = [["Year","Total Mortality", "CO2 KG"]];
        for(i=0;i<data.length;i++){
          graf=data[i];
          for(j=0; j<data1.length; j++){
            graf1=data1[j];
            if(data[i].year==data1[j].year){
              var grafForWidget=[graf.year, Number(graf.totalMortality), Number(graf1.co2kg)];
              datos.push(grafForWidget);
            }
          }
        }
        var datosRecogidos = google.visualization.arrayToDataTable(datos);
        var options = {
              title : 'Total mortality and CO2 kg in Spain',
              vAxis: {title: 'Total mortality and CO2 kg'},
              hAxis: {title: 'Year'},
              seriesType: 'bars',
              series: {5: {type: 'line'}}
           };
          var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
            chart.draw(datosRecogidos, options);
      })
    })
  })
}