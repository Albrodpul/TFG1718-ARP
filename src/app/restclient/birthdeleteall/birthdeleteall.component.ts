import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthdeleteall',
  templateUrl: './birthdeleteall.component.html',
  styleUrls: ['./birthdeleteall.component.css']
})
export class BirthdeleteallComponent implements OnInit {

  constructor(public http: Http,
  public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Delete All Component initialized");
  }

  public deleteAll(): void {
    this.http.delete(this.restclient.baseURL)
      .subscribe(
      data => {
        this.restclient.refresh();
      });
  }


}
