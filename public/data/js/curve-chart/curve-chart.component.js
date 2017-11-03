google.charts.load('current', {
  'packages': ['corechart']
});

'use strict'

angular
  .module("curveChart")
  .component("curveChart", {
    templateUrl: 'js/curve-chart/curve-chart.template.html',
    controller: ["$scope", "$http", function($scope, $http) {
      console.log("Curve Chart Controller initialized");

      var baseURL = '/api/v1/spain-births';
      $http
        .get(baseURL)
        .then(function(response) {
          var dataFromServer = response.data;

          $http
            .get("/1.0/population/Spain/18")
            .then(function(response2) {
              var dataFromServer2 = response2.data;

              google.charts.setOnLoadCallback(drawChart);

              function drawChart() {
                var dataForWidget = [
                  ["Year", "Total Birth", "Population with 18 years old"]
                ];

                //Tranformación
                for (var i = 0; i < dataFromServer.length; i++) {
                  console.log("Entro en el bucle");
                  var item = dataFromServer[i];
                  //console.log(item);
                  for (var j = 0; j < dataFromServer2.length; j++) {
                    var item2 = dataFromServer2[j];
                    if ((item.year == item2.year)) {
                      console.log(item2.year);
                      var itemForWidget = [item.year, item.totalbirth, item2.total];
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
    }]
  });
