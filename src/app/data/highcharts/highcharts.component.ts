import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var Highcharts: any;

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css'],
})
export class HighchartsComponent implements OnInit {
  port = window.location.port;
  baseURL = this.getUrl();
  public getUrl(): string {
    console.log(this.port);
    if (this.port == '4200') {
      this.baseURL = 'http://localhost:8080/api/v1/spain-births';
    } else {
      this.baseURL = '../api/v1/spain-births';
    }
    console.log(this.baseURL);
    return this.baseURL;
  }

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get(this.baseURL)
    .subscribe(
    data => {
      var dataFromServer = data.json();
      var dataForWidget = [];
      //Tranformación
      for (var i = 0; i < dataFromServer.length; i++) {
          var item = dataFromServer[i];
          //console.log(item);
          var itemForWidget = [item.region, item.totalbirth];
          dataForWidget.push(itemForWidget);
      }
      Highcharts.chart('container', {
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

  }

}
