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

  url = 'http://localhost:4200/api/v1/spain-births';
  births: any;
  status: any;
  statusText: any;

  public get(): void {
    this.http.get(this.url)
      .subscribe(
        data => {
        console.log(data);
        this.births = data.json();
        this.status = data.status;
        this.statusText = data.statusText;
      },err => {
        this.status = err.status;
        this.statusText = err.statusText;
        this.births = [];
      });

  }

  constructor(public http: Http) { }

  ngOnInit() {
  }

}
