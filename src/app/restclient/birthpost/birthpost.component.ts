import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  @Input() newBirthRegion:any;
  @Input() newBirthYear:any;
  @Input() newBirthMen: any;
  @Input() newBirthWomen: any;
  @Input() newBirthTotalBirth: any;

  constructor(public http: HttpClient,
    public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Post Component initialized");
  }

  public addBirth(region, year, men, women, totalbirth): void {
    this.newBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.post(this.restclient.baseURL, this.newBirth, { responseType: 'text' })
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
