import { Component, OnInit } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { RestclientComponent } from '../../restclient.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var Materialize: any;

@Component({
  selector: 'app-birthupload',
  templateUrl: './birthupload.component.html',
  styleUrls: ['./birthupload.component.css']
})
export class BirthuploadComponent implements OnInit {

  /* Nuevo dato a introducir */
  newBirth: any;

  constructor(private restclient:RestclientComponent,private http:Http) { }

  ngOnInit() {
    console.log("Birth Upload Component initialized");
  }

  public convertFile = () => {
    console.log("Inserting CSV...");
    var file = (<HTMLInputElement>document.getElementById('file-upload')).files[0];
    const input = document.getElementById('file-upload');
    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;

      //convert text to json here
      var json = this.csvJSON(text);
    };
    reader.readAsText(file);
    Materialize.toast("Has subido un fichero .CSV de " + file.size + "Bytes", 4000);
  }

  public csvJSON(csv): void {
    var line = csv.split("\n");
    var lines = line.slice(0, line.length - 1);
    var header = lines[0].split(";");
    for (var i = 1; i < lines.length; i++) {
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
    Materialize.toast("Has subido " + (i-1) + " dato(s) nuevo(s)", 4000);
  }

}
