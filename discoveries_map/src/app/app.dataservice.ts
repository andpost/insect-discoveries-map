import {Injectable} from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Art } from "./art-entity";
import { Beobachtung } from "./beobachtung-entity";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    getInsektenFunde() {
      return this.http.get<Beobachtung[]>('assets/beobachtungen.json');
    }

    getArten() {
      return this.http.get<Art[]>('assets/arten.json');
    }
}