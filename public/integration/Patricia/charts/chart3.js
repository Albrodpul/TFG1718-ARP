google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawVisualization);

//Consumo de una api externa 

function drawVisualization(){
  $(document).ready(function(){
    var request=$.ajax({
      url:"https://restcountries.eu/rest/v1/"
    })
    request.done(function(data, status){
        var datos = [["Country","Population"]];
        for(i=0;i<data.length;i++){
            graf=data[i];
            var grafForWidget=[graf.name, Number(graf.population)];
            datos.push(grafForWidget);
          
        }
        var datosRecogidos = google.visualization.arrayToDataTable(datos);
        var options = {
              title: 'Consume external api of total population in differents countries',
              pieHole: 0.4,
           };
          var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(datosRecogidos, options);

    })
  })
}