import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthdelete',
  templateUrl: './birthdelete.component.html',
  styleUrls: ['./birthdelete.component.css']
})
export class BirthdeleteComponent implements OnInit {

  /* Recoge el valor del birth del parent component */
  @Input() birth:string;
  

  constructor(public http: Http,
    public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Delete Component initialized");
  }

  public deleteBirth(region, year): void {
    this.http.delete(this.restclient.baseURL + '/' + region + '/' + year)
      .subscribe(
      res => {
        this.restclient.refresh();
      });
  }

}
