      google.charts.load('current', {
        'packages': ['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyBCgoNzl-wYthCBuAk8ST-8LGEzDS_1Ses'
      });

      $(document).ready(function() {
        console.log("jQuery ready!");
        jQuery.support.cors = true;

        var request = $.ajax({
          type: "GET",
          url: '../../api/v1/spain-births',
          data: "{}",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        });
        request.done(function(dataFromServer, status) {

          google.charts.setOnLoadCallback(drawRegionsMap);

          function drawRegionsMap() {
            console.log(dataFromServer);
            var dataForWidget = [
              ['Region', 'Total Birth']
            ];

            //Tranformación
            for (var i = 0; i < dataFromServer.length; i++) {
              var item = dataFromServer[i];
              console.log(item);
              var itemForWidget = [item.region, item.totalbirth];
              dataForWidget.push(itemForWidget);
            }
            console.log(dataForWidget);
            var data = google.visualization.arrayToDataTable(dataForWidget);
            console.log("Success!");

            var options = {
              region: 'ES',
              colorAxis: { colors: ['green', 'blue'] },
              displayMode: 'markers',
            };


            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
          }
        });

      });
      