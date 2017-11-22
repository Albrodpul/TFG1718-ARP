import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthload',
  templateUrl: './birthload.component.html',
  styleUrls: ['./birthload.component.css']
})
export class BirthloadComponent implements OnInit {

  public loadInitialData(): void {
    this.http.get(this.restclient.baseURL + "/loadInitialData", { responseType: 'text' })
      .subscribe(
      data => {
        this.restclient.refresh();
      });
  }

  constructor(public http: HttpClient,
  public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Load Component Initialized");
  }

}
