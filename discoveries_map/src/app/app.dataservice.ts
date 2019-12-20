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

    getYearFromDateString(date : string) {
      return date.split("-")[0];
    }

    formatDateString(date : string) : string {
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "Mai", "Jun", "Jul",
        "Aug", "Sep", "Okt",
        "Nov", "Dez"
      ];
  
      var dateSplit = date.split("-");
    
      var day = dateSplit[2];
      var monthIndex = dateSplit[1];
  
      if (monthIndex.startsWith("0")) {
        monthIndex = monthIndex.charAt(1);
      }
  
      var year = dateSplit[0];
    
      return day + '. ' + monthNames[monthIndex] + ' ' + year;
    }
}