import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-birthfile',
  templateUrl: './birthfile.component.html',
  styleUrls: ['./birthfile.component.css']
})
export class BirthfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Birth File Component initialized");
  }

  public downloadExample(): void {
    var csvContent = "\uFEFF";
    csvContent += "region,year,men,women,totalbirth\r\n"; // add carriage return
    csvContent += "Andalucía,2009,4343,4343,4343\r\n"; // add carriage return
    csvContent += "Galicia,2010,4243,6456,76676\r\n"; // add carriage return
    csvContent += "Madrid,2011,6546,4234,76554\r\n"; // add carriage return
    var blob = new Blob([csvContent], { type: 'text/csv;charset=UTF-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, "Ejemplo.csv");
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Ejemplo.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

}
