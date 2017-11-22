import { Component, OnInit, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { AuthService } from '../../auth/auth.service';

declare var Materialize: any;

@Component({
  selector: 'app-jquery',
  templateUrl: './jquery.component.html',
  styleUrls: ['./jquery.component.css']
})
export class JqueryComponent implements OnInit {

  constructor(public http: HttpClient,
    public auth: AuthService) { }

  ngOnInit() {
  }

  port = window.location.port;
  url = this.getUrl();
  baseURL = this.getUrl();

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

  births: any;
  status: any;
  statusText: any;
  payload: any;
  log = "";
  newBirth: any;
  updatedBirth: any;

  public refresh(): void {
    console.log("Refreshing...");
    this.log = "Sending request...";
    this.http.get(this.baseURL, { observe: 'response' })
      .subscribe(
      data => {
        this.births = data.body;
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
    this.http.get(this.url, { observe: 'response' })
      .subscribe(
      data => {
        this.births = data.body;
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
    this.http.get(this.baseURL + "/loadInitialData", { responseType: 'text' })
      .subscribe(
      data => {
        this.refresh();
        this.refresh();
      });
  }

  public post(region, year, men, women, totalbirth): void {
    this.newBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.post(this.url, this.newBirth, { responseType: 'text' })
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
      var json = this.csvJSON(text);
    };
    reader.readAsText(file);
    Materialize.toast("Has subido un fichero .CSV de " + file.size + "Bytes", 4000);
  }

  public csvJSON(csv): void {
    var line = csv.split("\n");
    var lines = line.slice(0, line.length - 1);
    var header = lines[0].split(";");
    for (var i = 1; i < lines.length; i++) {
      var region: string;
      var year: number;
      var men: number;
      var women: number;
      var totalbirth: number;
      var currentline = lines[i].split(";");
      region = currentline[0];
      year = Number(currentline[1]);
      men = Number(currentline[2]);
      women = Number(currentline[3]);
      totalbirth = Number(currentline[4]);
      this.post(region, year, men, women, totalbirth);
    }
    Materialize.toast("Has subido " + (i - 1) + " dato(s) nuevo(s)", 4000);
  }

  public csv(payload): void {
    if (payload != "") {
      var line = payload.split("\n");
      var lines = line.slice(1, line.length);
      var header = lines[0].split(";");
      console.log(lines);
      for (var i = 0; i < lines.length; i++) {
        var region: string;
        var year: number;
        var men: number;
        var women: number;
        var totalbirth: number;
        var currentline = lines[i].split(";");
        region = currentline[0];
        year = Number(currentline[1]);
        men = Number(currentline[2]);
        women = Number(currentline[3]);
        totalbirth = Number(currentline[4]);
        this.post(region, year, men, women, totalbirth);
      }
    }
    Materialize.toast("Has subido " + i + " dato(s) nuevo(s)", 4000);
  }


  public put(region, year, men, women, totalbirth): void {
    this.updatedBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.put(this.url, this.updatedBirth, { responseType: 'text' })
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public delete(): void {
    this.http.delete(this.url, { responseType: 'text' })
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }


}

