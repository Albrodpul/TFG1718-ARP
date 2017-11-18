import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthload',
  templateUrl: './birthload.component.html',
  styleUrls: ['./birthload.component.css']
})
export class BirthloadComponent implements OnInit {

  public loadInitialData(): void {
    this.http.get(this.restclient.baseURL + "/loadInitialData")
      .subscribe(
      data => {
        this.restclient.refresh();
      });
  }

  constructor(public http: Http,
  public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Load Component Initialized");
  }

}
