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
  url = this.getUrl();


  public getUrl(): string {
    console.log(this.port);
    if (this.port == '4200') {
      this.baseURL = 'http://localhost:8080/api/v1/spain-births';
      this.url = 'http://localhost:8080/api/v1/spain-births';
    } else {
      this.baseURL = '../api/v1/spain-births';
      this.url = '../api/v1/spain-births';
    }
    console.log(this.baseURL);
    return this.baseURL;
  }

  births: any;
  status: any;
  statusText: any;
  newBirth: any;
  updatedBirth: any;

  public refresh(): void {
    this.http.get(this.baseURL)
      .subscribe(
      data => {
        console.log(data);
        this.births = data.json();
        this.status = data.status;
        this.statusText = data.statusText;
      });
  }

  public get(): void {
    this.http.get(this.url)
      .subscribe(
      data => {
        this.births = data.json();
        this.status = data.status;
        this.statusText = data.statusText;
      },
      err => {
        this.births = [];
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public loadBirth(): void {
    this.http.get(this.baseURL + '/loadInitialData')
      .subscribe(
      data => {
        this.refresh();
      });
  }

  public addBirth(region, year, men, women, totalbirth): void {
    this.newBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.post(this.baseURL, this.newBirth)
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public updateBirth(region, year, updatedRegion, updatedYear, updatedMen, updatedWomen, updatedTotalbirth): void {
    this.updatedBirth = { "region": updatedRegion, "year": Number(updatedYear), "men": Number(updatedMen), "women": Number(updatedWomen), "totalbirth": Number(updatedTotalbirth) };
    console.log(this.updatedBirth);
    this.http.put(this.baseURL + '/' + region + '/' + year, this.updatedBirth)
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public deleteBirth(region, year): void {
    console.log(region, year);
    this.http.delete(this.baseURL + '/' + region + '/' + year)
      .subscribe(
      res => {
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
    this.refresh();
  }

}
