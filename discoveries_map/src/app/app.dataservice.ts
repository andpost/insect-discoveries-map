import {Injectable} from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Art } from "./art-entity";
import { Gattung } from "./gattung-entity";
import { Beobachtung } from "./beobachtung-entity";
import { Impressum } from "./impressum-entity";
import { UpdateInfo } from "./updateinfo-entity"


@Injectable({
    providedIn: 'root'
}) 
export class DataService {

    monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "Mai", "Jun", "Jul",
      "Aug", "Sep", "Okt",
      "Nov", "Dez"
    ];

    constructor(private http: HttpClient) {
    }

    getInsektenFunde() {
      return this.http.get<Beobachtung[]>('assets/beobachtungen.json');
    }

    getArten() {
      return this.http.get<Art[]>('assets/arten.json');
    }

    getGattungen() {
      return this.http.get<Gattung[]>('assets/gattungen.json');
    }

    getImpressumData(sourcePath : string) {
      return this.http.get<Impressum>(sourcePath);
    }

    getUpdateInfoData(sourcePath : string) {
      return this.http.get<UpdateInfo>(sourcePath);
    }

    getYearFromDateString(date : string) {
      return date.split("-")[0];
    }

    getMonthIndexFromDateString(date : string) {
      var dateSplit = date.split("-");
  
      var monthNumber = dateSplit[1];
  
      if (monthNumber.startsWith("0")) {
        monthNumber = monthNumber.charAt(1);
      }

      return parseInt(monthNumber) -1;
    }

    formatDateString(date : string) : string {
      var dateSplit = date.split("-");
    
      var day = dateSplit[2];
      var monthNumber = dateSplit[1];
  
      if (monthNumber.startsWith("0")) {
        monthNumber = monthNumber.charAt(1);
      }

      var monthIndex = parseInt(monthNumber) -1;
  
      var year = dateSplit[0];
    
      return day + '. ' + this.getMonthName(monthIndex) + ' ' + year;
    }

    getMonthName(monthIndex : number) {
      return this.monthNames[monthIndex];
    }
}