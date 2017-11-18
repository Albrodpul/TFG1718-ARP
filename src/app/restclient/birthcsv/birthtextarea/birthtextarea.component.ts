import { Component, OnInit, Input } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { RestclientComponent } from '../../restclient.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var Materialize: any;

@Component({
  selector: 'app-birthtextarea',
  templateUrl: './birthtextarea.component.html',
  styleUrls: ['./birthtextarea.component.css']
})
export class BirthtextareaComponent implements OnInit {

  /* Nuevo dato a introducir */
  newBirth: any;

  @Input() payload: any;

  constructor(public restclient: RestclientComponent,
    public http: Http) { }

  ngOnInit() {
    console.log("Birth Textarea Component initialized");
  }

  public csv(payload): void {
    if (payload != "") {
      console.log(payload);
      var line = payload.split("\n");
      var lines = line.slice(1, line.length);
      var header = lines[0].split(";");
      for (var i = 0; i < lines.length; i++) {
        var region: string;
        var year: number;
        var men: number;
        var women: number;
        var totalbirth: number;
        var currentline = lines[i].split(";");
        region = currentline[0];
        year = Number(currentline[1]);
        men = Number(currentline[2]);
        women = Number(currentline[3]);
        totalbirth = Number(currentline[4]);
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
      Materialize.toast("Has subido " + i + " dato(s) nuevos", 4000);
    }
  }

}
