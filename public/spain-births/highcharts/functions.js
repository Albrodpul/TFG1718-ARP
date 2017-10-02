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
      var dataForWidget=[];
      //Tranformación
      for(i=0;i<dataFromServer.length;i++){
        item=dataFromServer[i];
        //console.log(item);
        var itemForWidget=[item.region,item.totalbirth];
        dataForWidget.push(itemForWidget);
      }
$(function () {

  console.log("Esto es lo que debería imprimir:"+dataForWidget);
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Spain births'
        },
        subtitle: {
            text: 'Source: <a href="http://pestadistico.inteligenciadegestion.msssi.es/publicoSNS/comun/Cubo.aspx?IdNodo=6422#no-back-button">Portal Estadístico</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total births'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Total births: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: 'Total births',
            data: dataForWidget,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});
});
});
