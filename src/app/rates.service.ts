import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RatesService {
  

  constructor(private _http: HttpClient) { }

  dailyRates() {
    return this._http.get("http://144.76.65.130:8000/api/v1/test")
      .map(result => result);
  }

}
