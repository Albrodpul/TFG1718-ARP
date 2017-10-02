 google.charts.load('current', {'packages':['geochart']});

var loadData=[];
document.ready
       var request = $.ajax({
        url: '/data.json',
        type: GET,
        contentType: "application/json"
      });

      request.done(function(data,status){
        google.charts.setOnLoadCallback(drawRegionsMap);

      });

      function drawRegionsMap() {
        loadData=data;
        var data = google.visualization.arrayToDataTable(loadData);

        var options = {
          title:...
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }