google.charts.load('current', {
  'packages': ['corechart']
});

'use strict'

angular
  .module("corechart")
  .component("corechart", {
    templateUrl: 'js/corechart/corechart.template.html',
    controller: ["$scope", "$http", function ($scope, $http) {
      console.log("Core Chart Controller initialized");

      var baseURL = '/api/v1/spain-births/MADRID (COMUNIDAD DE)';
      $http
        .get(baseURL)
        .then(function (response) {
          var dataFromServer = response.data;

          google.charts.setOnLoadCallback(drawChart);

          function drawChart() {
            
            var dataForWidget = [
              ['Year', 'Men', 'Women']
            ];

            //Tranformación
            for (var i = 0; i < dataFromServer.length; i++) {
              var item = dataFromServer[i];
              
              var itemForWidget = [item.year, item.men, item.women];
              dataForWidget.push(itemForWidget);
            }
            
            var data = google.visualization.arrayToDataTable(dataForWidget);
            console.log("Success!");

            var options = {
              title: 'Evolution of men births vs women births in Madrid',
              hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 }
            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

            chart.draw(data, options);
          }
        });
    }]
  });
