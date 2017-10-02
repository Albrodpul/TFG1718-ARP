google.charts.load('current', {'packages':['geochart']});

$(document).ready(function(){
    console.log("jQuery ready!");
    jQuery.support.cors = true;

    var request=$.ajax({
        type: "GET",
        url: '../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });
      request.done(function(dataFromServer,status){

        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          console.log(dataFromServer);
          var dataForWidget=[["Region","Total birth"]];

        //Tranformación
        for(i=0;i<dataFromServer.length;i++){
          item=dataFromServer[i];
          console.log(item);
          var itemForWidget=[item.region,item.totalbirth];
          dataForWidget.push(itemForWidget);
        }
          console.log(dataForWidget);
          var data = google.visualization.arrayToDataTable(dataForWidget);
          console.log("Success!");

  var options = {
    region: 'ES',
    colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
    backgroundColor: '#81d4fa',
    datalessRegionColor: '#f8bbd0',
    defaultColor: '#f5f5f5',
    displayMode: 'markers',
  };


  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}
});

});
