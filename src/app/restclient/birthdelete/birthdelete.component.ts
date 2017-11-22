import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthdelete',
  templateUrl: './birthdelete.component.html',
  styleUrls: ['./birthdelete.component.css']
})
export class BirthdeleteComponent implements OnInit {

  /* Recoge el valor del birth del parent component */
  @Input() birth:any;
  

  constructor(public http: HttpClient,
    public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Delete Component initialized");
  }

  public deleteBirth(region, year): void {
    this.http.delete(this.restclient.baseURL + '/' + region + '/' + year, { responseType: 'text' })
      .subscribe(
      res => {
        this.restclient.refresh();
      });
  }

}
