import {Injectable} from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { InsektenFund } from "./app.insektenfund-entity";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    getInsektenFunde() {
      return this.http.get<InsektenFund[]>('assets/fundmeldungen.json');
    }
}