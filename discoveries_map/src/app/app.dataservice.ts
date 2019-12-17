import {Injectable} from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { InsektenFund } from "./insektenfund-entity";
import { Art } from "./art-entity";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    getInsektenFunde() {
      return this.http.get<InsektenFund[]>('assets/beobachtungen.json');
    }

    getArten() {
      return this.http.get<Art[]>('assets/arten.json');
    }
}