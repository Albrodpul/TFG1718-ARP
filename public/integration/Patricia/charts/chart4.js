google.charts.load("current", {packages: ["table"]});
google.charts.setOnLoadCallback(drawVisualization);

//Consumo de una api externa de albumes por ID de los usuarios

function drawVisualization(){
  $(document).ready(function(){
    var request=$.ajax({
      url:"https://jsonplaceholder.typicode.com/albums"
    })
    request.done(function(data, status){
        var datos = new google.visualization.DataTable();
        datos.addColumn('number', "ID");
        datos.addColumn('string', "Title");
        datos.addRows(data.length);
        for(i=0; i<data.length;i++){

            var datosRecogidos= data[i];
            datos.setCell(i,0,parseInt([datosRecogidos.id]));
            datos.setCell(i,1,[datosRecogidos.title].toString());
        }
           var chart = new google.visualization.Table(document.getElementById('chart_div'));
          chart.draw(datos, {showRowNumber: false, width: '100%', height: '100%'});

    })
  })
}