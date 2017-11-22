import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthdeleteall',
  templateUrl: './birthdeleteall.component.html',
  styleUrls: ['./birthdeleteall.component.css']
})
export class BirthdeleteallComponent implements OnInit {

  constructor(public http: HttpClient,
  public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Delete All Component initialized");
  }

  public deleteAll(): void {
    this.http.delete(this.restclient.baseURL, { responseType: 'text' })
      .subscribe(
      data => {
        this.restclient.refresh();
      });
  }


}
