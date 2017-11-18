import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RestclientComponent } from './../restclient.component';


@Component({
  selector: 'app-birthsearch',
  templateUrl: './birthsearch.component.html',
  styleUrls: ['./birthsearch.component.css'],
})
export class BirthsearchComponent implements OnInit {

  @Input() limitList: any;
  @Input() offsetList: any;
  @Input() regionList: any;
  @Input() yearList: any;
  @Input() fromList: any;
  @Input() toList: any;
  /* Indicadores para resetear los select */
  @Input() limits: any;
  @Input() offsets: any;
  @Input() regions: any;
  @Input() years: any;
  @Input() froms: any;
  @Input() tos: any;  

  constructor(public http: Http,
    public restclient: RestclientComponent) { }

  ngOnInit() {
    console.log("Birth Search Component initialized");
  }

  public search(limit, offset, region, year, from, to): void {
    var vOffset;
    var vOffset2;
    if (offset) {
      vOffset = (offset - 1) * this.restclient.vLimit;
      vOffset2 = (offset - 1) * limit;
    } else {
      vOffset = 0;
      vOffset2 = 0;
    }
    //no hay búsqueda
    if (!region && !year && !limit && !offset && !from && !to) {
      this.restclient.refresh();
      this.http.get(this.restclient.baseURL)
        .subscribe(
        data => {
          this.restclient.successCallback(data);
        });
    }
    //búsqueda de región
    else if (region && !year && !limit && !offset && !from && !to) {
      this.http.get(this.restclient.baseURL + '/' + region + '?limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y limit
    else if (region && !year && limit && !offset && !from && !to) {
      this.http.get(this.restclient.baseURL + '/' + region + '?limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y offset
    else if (region && !year && !limit && offset && !from && !to) {
      this.http.get(this.restclient.baseURL + '/' + region + '?limit=' + limit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, límite y offset
    else if (region && limit && !year && !from && !to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }

    //búsqueda de región y from
    else if (region && from && !year && !limit && !to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from y offset
    else if (region && from && !year && !limit && !to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from y límite
    else if (region && from && !year && limit && !to && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, límite y offset
    else if (region && from && !year && limit && !to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y to
    else if (region && to && !year && !from && !limit && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '?to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, to y offset
    else if (region && to && !year && !from && !limit && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '?to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, to y limit
    else if (region && to && !year && !from && limit && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, to, limit y offset
    else if (region && to && !year && !from && limit && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from y to
    else if (region && from && to && !limit && !year && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, to y offset
    else if (region && from && to && !limit && !year && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, to y limit
    else if (region && from && to && limit && !year && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, to, limit y offset
    else if (region && from && to && limit && !year && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año
    else if (year && !region && !limit && !from && !to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y offset
    else if (year && !region && !limit && !from && !to && offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y límite
    else if (year && limit && !region && !from && !to && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + year + '?limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, límite y offset
    else if (year && limit && !region && !from && !to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + year + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y from
    else if (year && from && !region && !limit && !to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from y offset
    else if (year && from && !region && !limit && !to && offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from y limit
    else if (year && from && !region && limit && !to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, limit y offset
    else if (year && from && !region && limit && !to && offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y to
    else if (year && to && !region && !from && !limit && !offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, to y offset
    else if (year && to && !region && !from && !limit && offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, to y limit
    else if (year && to && !region && !from && limit && !offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, to, limit y offset
    else if (year && to && !region && !from && limit && offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from y to
    else if (year && from && to && !limit && !region && !offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, to y offset
    else if (year && from && to && !limit && !region && offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, to y limit
    else if (year && from && to && limit && !region && !offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, to, limit y offset
    else if (year && from && to && limit && !region && offset) {
      this.http.get(this.restclient.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y año
    else if (region && year && !limit && !from && !to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año y offset
    else if (region && year && !limit && !from && !to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, límite
    else if (region && year && limit && !from && !to && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, límite y offset
    else if (region && year && limit && !from && !to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from
    else if (region && year && !limit && from && !to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from y offset
    else if (region && year && !limit && from && !to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from y limit
    else if (region && year && limit && from && !to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, limit y offset
    else if (region && year && limit && from && !to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to
    else if (region && year && !limit && !from && to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to y offset
    else if (region && year && !limit && !from && to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to y limit
    else if (region && year && limit && !from && to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to, limit y offset
    else if (region && year && limit && !from && to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from y to
    else if (region && year && !limit && from && to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, to y offset
    else if (region && year && !limit && from && to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, to y limit
    else if (region && year && limit && from && to && !offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, to, limit y offset
    else if (region && year && limit && from && to && offset) {
      this.http.get(this.restclient.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite
    else if (limit && !region && !year && !offset && !from && !to) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite y offset
    else if (limit && !region && !year && !from && !to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite y from
    else if (limit && !region && !year && from && !to && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, from y offset
    else if (limit && !region && !year && from && !to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite y to
    else if (limit && !region && !year && !from && to && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, to y offset
    else if (limit && !region && !year && !from && to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, from y to
    else if (limit && !region && !year && from && to && !offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, from, to y offset
    else if (limit && !region && !year && from && to && offset) {
      this.restclient.sLimit = limit;
      this.http.get(this.restclient.baseURL + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con from
    else if (from && !region && !year && !limit && !to && !offset) {
      this.http.get(this.restclient.baseURL + '?from=' + from + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con from y offset
    else if (from && !region && !year && !limit && !to && offset) {
      this.http.get(this.restclient.baseURL + '?from=' + from + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con to
    else if (!limit && !region && !year && !from && to && !offset) {
      this.http.get(this.restclient.baseURL + '?to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con to y offset
    else if (!limit && !region && !year && !from && to && offset) {
      this.http.get(this.restclient.baseURL + '?to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con from y to
    else if (!limit && !region && !year && from && to && !offset) {
      this.http.get(this.restclient.baseURL + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con from, to y offset
    else if (!limit && !region && !year && from && to && offset) {
      this.http.get(this.restclient.baseURL + '?from=' + from + '&to=' + to + '&limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }
    //búsqueda con offset
    else if (!limit && !region && !year && !from && !to && offset) {
      this.http.get(this.restclient.baseURL + '?limit=' + this.restclient.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.restclient.successCallbackSearch(data);
          this.http.get(this.restclient.baseURL)
            .subscribe(
            data => {
              this.restclient.successCallback(data);
            });
        },
        err => {
          this.restclient.errorCallbackSearch(err);
        });
    }

  }


}


