import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-restclient',
  templateUrl: './restclient.component.html',
  styleUrls: ['./restclient.component.css']
})
export class RestclientComponent implements OnInit {

  port = window.location.port;
  baseURL = this.getUrl();
  //url = this.getUrl();


  public getUrl(): string {
    console.log(this.port);
    if (this.port == '4200') {
      this.baseURL = 'http://localhost:8080/api/v1/spain-births';
      //this.url = 'http://localhost:8080/api/v1/spain-births';
    } else {
      this.baseURL = '../api/v1/spain-births';
      //this.url = '../api/v1/spain-births';
    }
    console.log(this.baseURL);
    return this.baseURL;
  }

  births: any;
  status: any;
  statusText: any;
  newBirth: any;
  updatedBirth: any;
  vLimit = 3;
  vOffset: any;
  vOffset2: any;
  limitList = [3, 4, 5];
  offsetList: any;
  regionList: any;
  yearList: any;
  fromList: any;
  toList: any;


  public refresh(): void {
    this.http.get(this.baseURL + '?limit=' + this.vLimit)
      .subscribe(
      data => {
        this.births = data.json();
        this.status = data.status;
        this.statusText = data.statusText;
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
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public updateBirth(region, year, updatedRegion, updatedYear, updatedMen, updatedWomen, updatedTotalbirth): void {
    this.updatedBirth = { "region": updatedRegion, "year": Number(updatedYear), "men": Number(updatedMen), "women": Number(updatedWomen), "totalbirth": Number(updatedTotalbirth) };
    console.log(this.updatedBirth);
    this.http.put(this.baseURL + '/' + region + '/' + year, this.updatedBirth)
      .subscribe(
      res => {
        this.refresh();
      },
      err => {
        this.status = err.status;
        this.statusText = err.statusText;
      });
  }

  public deleteBirth(region, year): void {
    console.log(region, year);
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
    if (offset) {
      this.vOffset = (offset - 1) * this.vLimit;
      this.vOffset2 = (offset - 1) * limit;
    } else {
      this.vOffset = 0;
      this.vOffset2 = 0;
    }
    //no hay búsqueda
    if (!region && !year && !limit && !offset && !from && !to) {
      this.refresh();
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
      this.http.get(this.baseURL + '/' + region + '?limit=' + limit + '&offset=' + this.vOffset)
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + region + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + year + '?limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '/' + year + '?limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + year + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + region + '/' + year + '?limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '/' + region + '/' + year + '?limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '?limit=' + limit + '&offset=' + this.vOffset2)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '?from=' + from + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '?to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.vLimit = limit;
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
      this.vLimit = limit;
      this.http.get(this.baseURL + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + this.vOffset2)
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
      this.http.get(this.baseURL + '?from=' + from + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '?to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '?from=' + from + '&to=' + to + '&limit=' + this.vLimit + '&offset=' + this.vOffset)
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
      this.http.get(this.baseURL + '?limit=' + this.vLimit + '&offset=' + this.vOffset)
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
    var page = Math.ceil((listAux.length) / (this.vLimit));
    for (var i = 1; i <= page; i++) {
      offsetList.push(i);
    }
    for (var j = 0; j < listAux.length; j++) {
      regionList.push(listAux[j].region);
      yearList.push(listAux[j].year);
    }
    console.log(regionList);
    this.offsetList = offsetList;
    this.regionList = regionList;
    this.yearList = yearList;
    this.fromList = yearList;
    this.toList = yearList;
  }


  constructor(public http: Http) { }

  ngOnInit() {
    console.log("REST Client Component Initialized");
    this.refresh();
  }

}
