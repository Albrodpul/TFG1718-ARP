google.charts.load('current', {'packages':['corechart']});

$(document).ready(function(){
    console.log("jQuery ready!");
    jQuery.support.cors = true;

    var request=$.ajax({
        type: "GET",
        url: '../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });
      request.done(function(dataFromServer,status){
        var request=$.ajax({
            type: "GET",
            url: '../../../1.0/population/Spain/18',
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
          });
        request.done(function(dataFromServer2,status){
          google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
              var dataForWidget=[["Year","Total Birth","Population with 18 years old"]];

            //Tranformación
            for(i=0;i<dataFromServer.length;i++){
              console.log("Entro en el bucle");
              item=dataFromServer[i];
              //console.log(item);
              for(j=0;j<dataFromServer2.length;j++){
                item2=dataFromServer2[j];
                if((item.year == item2.year)){
                  console.log(item2.year);
                  var itemForWidget=[item.year,item.totalbirth,item2.total];
                  console.log(itemForWidget);
                  dataForWidget.push(itemForWidget);
                }
              }
            }
              console.log(dataForWidget);
              var data = google.visualization.arrayToDataTable(dataForWidget);
              console.log("Success!");

              var options = {
                title: 'Spanish births vs Spanish Population at 18',
                curveType: 'function',
                legend: { position: 'bottom' }
              };

              var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

              chart.draw(data, options);
            }
    });
});
});
