import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-jquery',
  templateUrl: './jquery.component.html',
  styleUrls: ['./jquery.component.css']
})
export class JqueryComponent implements OnInit {

  port = window.location.port;
  url = this.getUrl();
  baseURL = this.getUrl();
  uploadURL = this.getUploadUrl();

  public getUrl(): string {
    if (this.port == '4200') {
      this.url = 'http://localhost:8080/api/v1/spain-births';
      this.baseURL = 'http://localhost:8080/api/v1/spain-births';
    } else {
      this.url = '../api/v1/spain-births';
      this.baseURL = '../api/v1/spain-births';
    }
    return this.url;
  }

  public getUploadUrl(): string {
    if ( this.port == '4200'){
      this.uploadURL = 'http://localhost:8080/upload';
    }else{
      this.uploadURL = '../upload';
    }
    return this.uploadURL;
  }

  births: any;
  status: any;
  statusText: any;
  payload: any;
  log = "";
  newBirth: any;
  updatedBirth: any;

  public refresh(): void {
    this.log = "Sending request...";
    this.http.get(this.baseURL)
      .subscribe(
      data => {
        console.log(data);
        this.births = data.json();
        this.status = data.status;
        this.statusText = data.statusText;
        this.log = "Data received";
      }, err => {
        this.status = err.status;
        this.statusText = err.statusText;
        this.births = [];
      });
  }

  public get(): void {
    this.log = "Sending request...";
    this.http.get(this.url)
      .subscribe(
      data => {
        this.births = data.json();
        this.status = data.status;
        this.statusText = data.statusText;
        this.log = "Data received";
      }, err => {
        this.status = err.status;
        this.statusText = err.statusText;
        this.births = [];
      });

  }

  public loadInitialData(): void {
    this.http.get(this.baseURL + "/loadInitialData")
      .subscribe(
      data => {
        this.refresh();
        this.refresh();
      });
  }

  public post(region, year, men, women, totalbirth): void {
    this.newBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.post(this.url, this.newBirth)
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public convertFile = () => {
    console.log("Inserting CSV...");
    var file = (<HTMLInputElement>document.getElementById('file-upload')).files[0];
    const input = document.getElementById('file-upload');
    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;

      //convert text to json here
      var json = this.csv(text);
    };
    reader.readAsText(file);
  }

  public csv(payload): void {
    var text: string;
    text = payload;
    console.log(text);
    this.http.post(this.uploadURL, text)
      .subscribe(
      res => {
        this.status= res.status;
        this.statusText=res.statusText;
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      });

  }


  public put(region, year, men, women, totalbirth): void {
    this.updatedBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.put(this.url, this.updatedBirth)
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      }
      )
  }

  public delete(): void {
    this.http.delete(this.url)
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      }
      )
  }

  constructor(public http: Http) { }

  ngOnInit() {
  }

}
