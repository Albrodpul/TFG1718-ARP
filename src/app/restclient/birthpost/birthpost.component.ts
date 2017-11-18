import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RestclientComponent } from './../restclient.component';

@Component({
  selector: 'app-birthpost',
  templateUrl: './birthpost.component.html',
  styleUrls: ['./birthpost.component.css']
})
export class BirthpostComponent implements OnInit {

  /* Nuevo dato a introducir */
  newBirth: any;
  /* Input provenientes del parent component */
  @Input() newBirthRegion:string;
  @Input() newBirthYear:number;
  @Input() newBirthMen: number;
  @Input() newBirthWomen: number;
  @Input() newBirthTotalBirth: number;

  constructor(public http: Http,
    public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Post Component initialized");
  }

  public addBirth(region, year, men, women, totalbirth): void {
    this.newBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.post(this.restclient.baseURL, this.newBirth)
      .subscribe(
      res => {
        this.restclient.refresh();
      },
      err => {
        this.restclient.error = true;
        this.restclient.status = err.status;
        this.restclient.statusText = err.statusText;
      });
  }

}
