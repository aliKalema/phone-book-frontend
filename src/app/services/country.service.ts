import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../interfaces/country";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  getAllCountries():Observable<Array<Country>>{
    return this.httpClient.get<Array<Country>>(`${environment.serverUrl}/api/v1/countries`);
  }
}
