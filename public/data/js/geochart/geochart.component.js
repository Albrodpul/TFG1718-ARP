      google.charts.load('current', {
        'packages': ['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyBCgoNzl-wYthCBuAk8ST-8LGEzDS_1Ses'
      });

      'use strict'

      angular
        .module("geochart")
        .component("geochart", {
          templateUrl: 'js/geochart/geochart.template.html',
          controller: ["$scope", "$http", function($scope, $http) {
            console.log("Geochart Controller initialized");

            var baseURL = '/api/v1/spain-births';
            $http
              .get(baseURL)
              .then(function(response) {
                var dataFromServer = response.data;


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
                    colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
                    backgroundColor: '#81d4fa',
                    datalessRegionColor: '#f8bbd0',
                    defaultColor: '#f5f5f5',
                    displayMode: 'markers',
                  };


                  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                  chart.draw(data, options);
                }
              });
          }]

        });
      