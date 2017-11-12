import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var google: any;

@Component({
  selector: 'app-corechart',
  templateUrl: './corechart.component.html',
  styleUrls: ['./corechart.component.css'],
})
export class CorechartComponent implements OnInit {
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

  constructor(public http: Http) { }

  ngOnInit() {
    console.log("Corechart Component initialized");
    google.charts.load('current', {
      'packages': ['corechart']
    });
    this.http.get(this.baseURL)
      .subscribe(
      data => {

        var dataFromServer = data.json();

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

          var options = {
            title: 'Evolution of men births vs women births in Spain',
            hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 }
          };

          var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

          chart.draw(data, options);
        }

      });
  }

}
