import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {MaterializeDirective,MaterializeAction} from "angular2-materialize";

declare var Materialize:any;

@Component({
  selector: 'app-restclient',
  templateUrl: './restclient.component.html',
  styleUrls: ['./restclient.component.css']
})
export class RestclientComponent implements OnInit {

  port = window.location.port;
  baseURL = this.getUrl();

  public getUrl(): string {
    if (this.port == '4200') {
      this.baseURL = 'http://localhost:8080/api/v1/spain-births';
    } else {
      this.baseURL = '../api/v1/spain-births';
    }
    return this.baseURL;
  }

  /* Datos de la tabla */
  births: any;
  /* Códigos de estado de errores */
  status: any;
  statusText: any;
  /* Indica si debe o no salir el mensaje de error */
  error: any;
  /* Nuevo dato a introducir */
  newBirth: any;
  /* Límite por defecto */
  vLimit = 3;
  /* Nuevo límite a modificar para cambiar los select */
  sLimit = 3;
  /* Listas que contienen los objetos de los select */
  limitList = [3, 4, 5];
  offsetList: any;
  regionList: any;
  yearList: any;
  fromList: any;
  toList: any;
  /* Indicadores para resetear los select */
  limits: any;
  offsets: any;
  regions: any;
  years: any;
  froms: any;
  tos: any;

  public refresh(): void {
    console.log("Refreshing...");
    this.http.get(this.baseURL + '?limit=' + this.vLimit)
      .subscribe(
      data => {
        this.sLimit = 3;
        this.births = data.json();
        this.status = "";
        this.statusText = "";
        this.error = false;
        this.limits = "";
        this.offsets = "";
        this.regions = "";
        this.years = "";
        this.froms = "";
        this.tos = "";
      });
    this.http.get(this.baseURL)
      .subscribe(
      data => {
        this.successCallback(data);
      });
  }

  public get(): void {
    this.http.get(this.baseURL)
      .subscribe(
      data => {
        this.refresh();
      });
  }

  public loadBirth(): void {
    this.http.get(this.baseURL + '/loadInitialData')
      .subscribe(
      data => {
        this.refresh();
      });
  }

  public addBirth(region, year, men, women, totalbirth): void {
    this.newBirth = { "region": region, "year": Number(year), "men": Number(men), "women": Number(women), "totalbirth": Number(totalbirth) };
    this.http.post(this.baseURL, this.newBirth)
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.error = true;
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public deleteBirth(region, year): void {
    this.http.delete(this.baseURL + '/' + region + '/' + year)
      .subscribe(
      res => {
        this.refresh();
      });
  }

  public deleteAll(): void {
    this.http.delete(this.baseURL)
      .subscribe(
      data => {
        this.refresh();
      });
  }

  public search(limit, offset, region, year, from, to): void {
    var vOffset;
    var vOffset2;
    if (offset) {
      vOffset = (offset - 1) * this.vLimit;
      vOffset2 = (offset - 1) * limit;
    } else {
      vOffset = 0;
      vOffset2 = 0;
    }
    //no hay búsqueda
    if (!region && !year && !limit && !offset && !from && !to) {
      this.refresh();
      this.http.get(this.baseURL)
        .subscribe(
        data => {
          this.successCallback(data);
        });
    }
    //búsqueda de región
    else if (region && !year && !limit && !offset && !from && !to) {
      this.http.get(this.baseURL + '/' + region + '?limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y limit
    else if (region && !year && limit && !offset && !from && !to) {
      this.http.get(this.baseURL + '/' + region + '?limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y offset
    else if (region && !year && !limit && offset && !from && !to) {
      this.http.get(this.baseURL + '/' + region + '?limit=' + limit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, límite y offset
    else if (region && limit && !year && !from && !to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }

    //búsqueda de región y from
    else if (region && from && !year && !limit && !to && !offset) {
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from y offset
    else if (region && from && !year && !limit && !to && offset) {
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from y límite
    else if (region && from && !year && limit && !to && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, límite y offset
    else if (region && from && !year && limit && !to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y to
    else if (region && to && !year && !from && !limit && !offset) {
      this.http.get(this.baseURL + '/' + region + '?to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, to y offset
    else if (region && to && !year && !from && !limit && offset) {
      this.http.get(this.baseURL + '/' + region + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, to y limit
    else if (region && to && !year && !from && limit && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, to, limit y offset
    else if (region && to && !year && !from && limit && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from y to
    else if (region && from && to && !limit && !year && !offset) {
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, to y offset
    else if (region && from && to && !limit && !year && offset) {
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, to y limit
    else if (region && from && to && limit && !year && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, from, to, limit y offset
    else if (region && from && to && limit && !year && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año
    else if (year && !region && !limit && !from && !to && !offset) {
      this.http.get(this.baseURL + '/' + year + '?limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y offset
    else if (year && !region && !limit && !from && !to && offset) {
      this.http.get(this.baseURL + '/' + year + '?limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y límite
    else if (year && limit && !region && !from && !to && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + year + '?limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, límite y offset
    else if (year && limit && !region && !from && !to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + year + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y from
    else if (year && from && !region && !limit && !to && !offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from y offset
    else if (year && from && !region && !limit && !to && offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from y limit
    else if (year && from && !region && limit && !to && !offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, limit y offset
    else if (year && from && !region && limit && !to && offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año y to
    else if (year && to && !region && !from && !limit && !offset) {
      this.http.get(this.baseURL + '/' + year + '?to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, to y offset
    else if (year && to && !region && !from && !limit && offset) {
      this.http.get(this.baseURL + '/' + year + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, to y limit
    else if (year && to && !region && !from && limit && !offset) {
      this.http.get(this.baseURL + '/' + year + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, to, limit y offset
    else if (year && to && !region && !from && limit && offset) {
      this.http.get(this.baseURL + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from y to
    else if (year && from && to && !limit && !region && !offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, to y offset
    else if (year && from && to && !limit && !region && offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, to y limit
    else if (year && from && to && limit && !region && !offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de año, from, to, limit y offset
    else if (year && from && to && limit && !region && offset) {
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región y año
    else if (region && year && !limit && !from && !to && !offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año y offset
    else if (region && year && !limit && !from && !to && offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, límite
    else if (region && year && limit && !from && !to && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '/' + year + '?limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, límite y offset
    else if (region && year && limit && !from && !to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '/' + region + '/' + year + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from
    else if (region && year && !limit && from && !to && !offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from y offset
    else if (region && year && !limit && from && !to && offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from y limit
    else if (region && year && limit && from && !to && !offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, limit y offset
    else if (region && year && limit && from && !to && offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to
    else if (region && year && !limit && !from && to && !offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to y offset
    else if (region && year && !limit && !from && to && offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to y limit
    else if (region && year && limit && !from && to && !offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, to, limit y offset
    else if (region && year && limit && !from && to && offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from y to
    else if (region && year && !limit && from && to && !offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, to y offset
    else if (region && year && !limit && from && to && offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, to y limit
    else if (region && year && limit && from && to && !offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda de región, año, from, to, limit y offset
    else if (region && year && limit && from && to && offset) {
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite
    else if (limit && !region && !year && !offset && !from && !to) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite y offset
    else if (limit && !region && !year && !from && !to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite y from
    else if (limit && !region && !year && from && !to && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?from=' + from + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, from y offset
    else if (limit && !region && !year && from && !to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite y to
    else if (limit && !region && !year && !from && to && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, to y offset
    else if (limit && !region && !year && !from && to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, from y to
    else if (limit && !region && !year && from && to && !offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?from=' + from + '&to=' + to + '&limit=' + limit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con límite, from, to y offset
    else if (limit && !region && !year && from && to && offset) {
      this.sLimit = limit;
      this.http.get(this.baseURL + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con from
    else if (from && !region && !year && !limit && !to && !offset) {
      this.http.get(this.baseURL + '?from=' + from + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con from y offset
    else if (from && !region && !year && !limit && !to && offset) {
      this.http.get(this.baseURL + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con to
    else if (!limit && !region && !year && !from && to && !offset) {
      this.http.get(this.baseURL + '?to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con to y offset
    else if (!limit && !region && !year && !from && to && offset) {
      this.http.get(this.baseURL + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con from y to
    else if (!limit && !region && !year && from && to && !offset) {
      this.http.get(this.baseURL + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con from, to y offset
    else if (!limit && !region && !year && from && to && offset) {
      this.http.get(this.baseURL + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }
    //búsqueda con offset
    else if (!limit && !region && !year && !from && !to && offset) {
      this.http.get(this.baseURL + '?limit=' + this.vLimit + '&offset=' + vOffset)
        .subscribe(
        data => {
          this.successCallbackSearch(data);
          this.http.get(this.baseURL)
            .subscribe(
            data => {
              this.successCallback(data);
            });
        },
        err => {
          this.errorCallbackSearch(err);
        });
    }

  }


  public successCallbackSearch(data): void {
    this.births = data.json();
    this.status = data.status;
    this.statusText = data.statusText;
  }

  public errorCallbackSearch(err): void {
    this.births = [];
    this.status = err.status;
    this.statusText = err.statusText;
  }

  public successCallback(data): void {
    var listAux = data.json();
    var offsetList = [];
    var regionList = [];
    var yearList = [];
    var fromList = [];
    var toList = [];
    var page = Math.ceil((listAux.length) / (this.sLimit));
    for (var i = 1; i <= page; i++) {
      offsetList.push(i);
    }
    for (var j = 0; j < listAux.length; j++) {
      regionList.push(listAux[j].region);
      yearList.push(listAux[j].year);
      fromList.push(listAux[j].year);
      toList.push(listAux[j].year);
    }
    this.offsetList = offsetList;
    this.regionList = regionList;
    this.yearList = yearList;
    this.fromList = fromList;
    this.toList = toList;
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
    Materialize.toast("Has subido un fichero .CSV de "+file.size+"Bytes",4000);
  }

  public csvJSON(csv): void {
    var line = csv.split("\n");
    var lines = line.slice(0,line.length-1);
    var header = lines[0].split(";");
    console.log(header);
    for (var i = 1; i < lines.length; i++) {
      var region:string;
      var year:number;
      var men:number;
      var women:number;
      var totalbirth:number;
      var currentline = lines[i].split(";");
      console.log(currentline);
      region = currentline[0];
      year = Number(currentline[1]);
      men = Number(currentline[2]);
      women = Number(currentline[3]);
      totalbirth = Number(currentline[4]);
      this.addBirth(region,year,men,women,totalbirth);
    }
    Materialize.toast("Has subido "+lines.length+" datos nuevos",4000);
  }

  

  constructor(public http: Http) { }

  ngOnInit() {
    console.log("REST Client Component Initialized");
    this.refresh();
  }

}
