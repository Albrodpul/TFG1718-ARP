import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  port = window.location.port;
  baseURL = this.getUrl();
  births: any;
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
    console.log("Data Component Initialized");
    this.http.get(this.baseURL)
    .subscribe(
    data => {
      this.births = data.json();
    });    
  }

}
