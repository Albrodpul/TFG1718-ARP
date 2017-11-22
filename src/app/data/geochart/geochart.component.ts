import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-geochart',
  templateUrl: './geochart.component.html',
  styleUrls: ['./geochart.component.css'],
})
export class GeochartComponent implements OnInit {
  port = window.location.port;
  baseURL = this.getUrl();
  public getUrl(): string {
    if (this.port == '4200') {
      this.baseURL = 'http://localhost:8080/api/v1/spain-births';
    } else {
      this.baseURL = '../api/v1/spain-births';
    }
    return this.baseURL;
  }

  constructor(public http: HttpClient) { }

  ngOnInit() {
    console.log("Geochart Component initilized");
    google.charts.load('current', {
      'packages': ['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyBCgoNzl-wYthCBuAk8ST-8LGEzDS_1Ses'
    });
    this.http.get(this.baseURL)
      .subscribe(
      data => {
        var dataFromServer = data;
        google.charts.setOnLoadCallback(drawRegionsMap);
        function drawRegionsMap() {

          var dataForWidget = [
            ['Region', 'Total Birth']
          ];

          //Tranformación
          for (var i = 0; i < Object.keys(dataFromServer).length; i++) {
            var item = dataFromServer[i];

            var itemForWidget = [item.region, item.totalbirth];
            dataForWidget.push(itemForWidget);
          }

          var data = google.visualization.arrayToDataTable(dataForWidget);

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
  }

}
