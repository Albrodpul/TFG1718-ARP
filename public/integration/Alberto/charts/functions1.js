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
            url: '../../../api/v1/oil?apikey=multiPlan_C4_sos-2016-01-fjfr_ag',
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
          });
        request.done(function(dataFromServer2,status){
          console.log(dataFromServer2);
          google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
              var dataForWidget=[["Year","Total Birth","Diesel per litre"]];
              //console.log("A punto de entrar en bucle");
              //Tranformación
              for(i=0;i<dataFromServer.length;i++){
                //console.log("Entro en el bucle");
                item=dataFromServer[i];
                //console.log(item);
                for(j=0;j<dataFromServer2.length;j++){
                  //console.log("Entro en el bucle 2");
                  item2=dataFromServer2[j];
                  //console.log(item2);
                  if((item.year == item2.year)){
                    var itemForWidget=[item.year,item.totalbirth,item2.diesel];
                    console.log(itemForWidget);
                    dataForWidget.push(itemForWidget);
                  }
                }
              }
              console.log(dataForWidget);
              var data = google.visualization.arrayToDataTable(dataForWidget);
              console.log("Success!");

              var options = {
                chart: {
                  title: 'Spain births and oil',
                  subtitle: 'Since: 2009-2011',
                }
              };


              var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
       	   	  chart.draw(data, options);
            }
    });
});
});
