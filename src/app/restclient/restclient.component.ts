import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-restclient',
  templateUrl: './restclient.component.html',
  styleUrls: ['./restclient.component.css']
})
export class RestclientComponent implements OnInit {

  port = window.location.port;
  baseURL = this.getUrl();

  /* Datos de la tabla */
  births: any;
  /* Códigos de estado de errores */
  status: any;
  statusText: any;
  /* Indica si debe o no salir el mensaje de error */
  error: any;
  /* Límite por defecto */
  vLimit = 3;
  /* Nuevo límite a modificar para cambiar los select */
  sLimit = 3;
  /* Listas que contienen los objetos de los select */
  limitList = [3, 4, 5];
  offsetList: any;
  regionList: any;
  yearList: any;
  fromList: any;
  toList: any;
  /* Indicadores para resetear los select */
  limits: any;
  offsets: any;
  regions: any;
  years: any;
  froms: any;
  tos: any;

  constructor(public http: Http,
    public auth: AuthService) { }

  ngOnInit() {
    console.log("REST Client Component Initialized");
    this.refresh();
  }

  public getUrl(): string {
    if (this.port == '4200') {
      this.baseURL = 'http://localhost:8080/api/v1/spain-births';
    } else {
      this.baseURL = '../api/v1/spain-births';
    }
    return this.baseURL;
  }

  public refresh(): void {
    console.log("Refreshing...");
    this.http.get(this.baseURL + '?limit=' + this.vLimit)
      .subscribe(
      data => {
        this.sLimit = 3;
        this.births = data.json();
        this.status = "";
        this.statusText = "";
        this.error = false;
        this.limits = "";
        this.offsets = "";
        this.regions = "";
        this.years = "";
        this.froms = "";
        this.tos = "";
      });
    this.http.get(this.baseURL)
      .subscribe(
      data => {
        this.successCallback(data);
      });
  }


  public successCallbackSearch(data): void {
    this.births = data.json();
    this.status = data.status;
    this.statusText = data.statusText;
    this.error = false;
  }

  public errorCallbackSearch(err): void {
    this.births = [];
    this.status = err.status;
    this.statusText = err.statusText;
    this.error = true;
  }

  public successCallback(data): void {
    var listAux = data.json();
    var offsetList = [];
    var regionList = [];
    var yearList = [];
    var fromList = [];
    var toList = [];
    var page = Math.ceil((listAux.length) / (this.sLimit));
    for (var i = 1; i <= page; i++) {
      offsetList.push(i);
    }
    for (var j = 0; j < listAux.length; j++) {
      regionList.push(listAux[j].region);
      yearList.push(listAux[j].year);
      fromList.push(listAux[j].year);
      toList.push(listAux[j].year);
    }
    this.offsetList = offsetList;
    this.regionList = regionList;
    this.yearList = yearList;
    this.fromList = fromList;
    this.toList = toList;
  }

}
