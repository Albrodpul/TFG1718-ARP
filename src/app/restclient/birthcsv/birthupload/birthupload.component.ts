import { Component, OnInit } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";
import { RestclientComponent } from '../../restclient.component';
import { HttpClient } from '@angular/common/http';

declare var Materialize: any;

@Component({
  selector: 'app-birthupload',
  templateUrl: './birthupload.component.html',
  styleUrls: ['./birthupload.component.css']
})
export class BirthuploadComponent implements OnInit {

  /* Nuevo dato a introducir */
  newBirth: any;

  constructor(private restclient: RestclientComponent, private http: HttpClient) { }

  ngOnInit() {
    console.log("Birth Upload Component initialized");
  }

  public convertFile = () => {
    console.log("Inserting CSV...");
    var file = (<HTMLInputElement>document.getElementById('file-upload')).files[0];
    var extension = file.name.split(".")[1];
    if (extension != "csv") {
      this.restclient.error = true;
      this.restclient.statusText = "File extension must be .csv";
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        let text = reader.result;
        //convert text to json here
        //check if \uFEFF is present
        var flag = this.checkSpecialChars(text);
        if (flag == 0) { // \uFEFF not present: csv file edited
          const reader = new FileReader();
          reader.onload = () => {
            let text = reader.result;
            //convert text to json here
            this.csvJSON(text);
          };
          reader.readAsBinaryString(file);
        } else { // \uFEFF present: csv file without edit
          const reader = new FileReader();
          reader.onload = () => {
            let text = reader.result;
            //convert text to json here
            this.csvJSON(text);
          };
          reader.readAsText(file);
        }
      };
      reader.readAsBinaryString(file);
      Materialize.toast("Has subido un fichero .CSV de " + file.size + "Bytes", 4000);
    }
  }

  public csvJSON(csv): void {
    if (csv.substring(0, 3) == "ï»¿") { //csv text file without edit
      var line = csv.substring(3);
      line = line.split("\r\n");
      var lines = line.slice(1, line.length - 1);
      var header = lines[0].split(",");
      for (var i = 0; i < lines.length; i++) {
        var region: string;
        var year: number;
        var men: number;
        var women: number;
        var totalbirth: number;
        var currentline = lines[i].split(",");
        region = currentline[0];
        year = Number(currentline[1]);
        men = Number(currentline[2]);
        women = Number(currentline[3]);
        totalbirth = Number(currentline[4]);
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
      Materialize.toast("Has subido " + i + " dato(s) nuevo(s)", 4000);
    } else { //csv text file edited
      var line = csv.split("\r\n");
      var lines = line.slice(1, line.length - 1);
      var header = lines[0].split(",");
      for (var i = 0; i < lines.length; i++) {
        var region: string;
        var year: number;
        var men: number;
        var women: number;
        var totalbirth: number;
        var currentline = lines[i].split(",");
        region = currentline[0];
        year = Number(currentline[1]);
        men = Number(currentline[2]);
        women = Number(currentline[3]);
        totalbirth = Number(currentline[4]);
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
      Materialize.toast("Has subido " + i + " dato(s) nuevo(s)", 4000);
    }
  }

  public checkSpecialChars(csv): any {
    var flag;
    if (csv.substring(0, 3) != "ï»¿") { //csv text file edited
      flag = 0;
    } else {  //csv text file without edit
      flag = 1;
    }
    return flag;
  }

}
