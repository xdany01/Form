import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Pais} from "../model/pais";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private http: HttpClient
  ) {
  }

  getPaises() {
    return this.http.get('https://restcountries.com/v3.1/lang/spa')
      .pipe(
        // @ts-ignore
        map((resp: any[]) => {
          return resp.map(pais => {
            return {
              codigo: pais.cioc,
              nombre: pais.name.common
            }
          })
        })
      );
  }
}
