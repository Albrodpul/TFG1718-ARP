import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-restclient',
  templateUrl: './restclient.component.html',
  styleUrls: ['./restclient.component.css']
})
export class RestclientComponent implements OnInit {

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

  births: any;
  status: any;
  statusText: any;
  log: any;

  public refresh(): void {
    this.http.get(this.baseURL)
      .subscribe(
      data => {
        this.births = data.json();
        this.status = data.status;
        this.statusText = data.statusText;
      });
  }

  public get(): void {
    this.refresh();
  }

  public loadInitialData(): void {
    this.http.get(this.baseURL + '/loadInitialData')
      .subscribe(
      data => {
        this.refresh();
      });
  }

  public deleteAll(): void {
    this.http.delete(this.baseURL)
      .subscribe(
      data => {
        this.refresh();
      });
  }

  constructor(public http: Http) { }

  ngOnInit() {
    console.log("REST Client Component Initialized");
  }

}
