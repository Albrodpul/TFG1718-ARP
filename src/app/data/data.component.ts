import { Component, OnInit, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';



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

  constructor(public http: HttpClient,
    public auth: AuthService) { }

  ngOnInit() {
    console.log("Data Component Initialized");
    this.http.get(this.baseURL, { observe: 'response' })
      .subscribe(
      data => {
        this.births = data.body;
      });
  }

}