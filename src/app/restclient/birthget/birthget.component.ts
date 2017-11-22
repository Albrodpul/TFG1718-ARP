import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthget',
  templateUrl: './birthget.component.html',
  styleUrls: ['./birthget.component.css']
})
export class BirthgetComponent implements OnInit {

  constructor(public http: HttpClient,
    public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Get Component initialized");
  }

  public get(): void {
    this.http.get(this.restclient.baseURL, { observe: 'response' })
      .subscribe(
      data => {
        this.restclient.refresh();
      });
  }

}
