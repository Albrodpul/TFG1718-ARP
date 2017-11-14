import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-birthedit',
  templateUrl: './birthedit.component.html',
  styleUrls: ['./birthedit.component.css']
})
export class BirtheditComponent implements OnInit {

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

  updatedBirths: any;
  updatedBirth: any;
  region = this.route.snapshot.paramMap.get('region');
  year = +this.route.snapshot.paramMap.get('year');


  public getBirth(): void {
    this.http.get(this.baseURL + '/' + this.region + '/' + this.year)
      .subscribe(
      data => {
        this.updatedBirths = data.json();
      }
      )
  }

  public updateBirth(updatedRegion, updatedYear, updatedMen, updatedWomen, updatedTotalBirth): void {
    this.updatedBirth = { "region": updatedRegion, "year": Number(updatedYear), "men": Number(updatedMen), "women": Number(updatedWomen), "totalbirth": Number(updatedTotalBirth) };
    console.log(this.updatedBirth);
    this.http.put(this.baseURL + '/' + this.region + '/' + this.year, this.updatedBirth)
      .subscribe(
      res => {
        this.location.back();
      });
  }


  constructor(private route: ActivatedRoute,
    private location: Location,
    public http: Http) { }

  ngOnInit() {
    console.log("Birth Edit Component initialized");
    this.getBirth();
  }

}