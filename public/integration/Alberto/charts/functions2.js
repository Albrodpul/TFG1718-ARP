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
            url: 'http://sos-2016-04.herokuapp.com/api/v1/population-labor-force-percentage-by-education?apikey=multiPlan_C4_sos-2016-04-arc_ag',
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
          });
        request.done(function(dataFromServer2,status){
          google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
              var dataForWidget=[["Year","Total Birth","Secondary students"]];

            //Tranformación
            for(i=0;i<dataFromServer.length;i++){
              item=dataFromServer[i];
              //console.log(item);
              for(j=0;j<dataFromServer2.length;j++){
                item2=dataFromServer2[j];
                //console.log(item2);
                if((item.year == item2.year)){
                  var itemForWidget=[item.year,item.totalbirth,item2.secondaryEducation*100];
                  console.log(itemForWidget);
                  dataForWidget.push(itemForWidget);
                }
              }
            }
              //console.log(dataForWidget);
              var data = google.visualization.arrayToDataTable(dataForWidget);
              console.log("Success!");

              var options = {
                title: 'Spanish births vs Secondary students',
                hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
                vAxis: {minValue: 0}
              };

              var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
              chart.draw(data, options);
            }
    });
});
});
