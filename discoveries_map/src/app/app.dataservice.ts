import {Injectable} from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { DiscoveryEntity } from "./app.discovery-entity";


@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    getDiscoveries() {
      return this.http.get<DiscoveryEntity[]>('assets/fundmeldungen.json');
    }
}