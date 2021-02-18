import { Component, OnInit } from '@angular/core';
import { Beobachtung } from "../beobachtung-entity";
import { DataService } from '../app.dataservice';

@Component({
  selector: 'app-discoveries-page',
  templateUrl: './discoveries-page.component.html',
  styleUrls: ['./discoveries-page.component.css']
})
export class DiscoveriesPageComponent implements OnInit {

  beobachtungen : Beobachtung[];
  pageOfBeobachtungen : Beobachtung[];
  fromDate : string;
  toDate : string;

  constructor(private dataService: DataService) { 
    this.loadDiscoveries();
  }

  ngOnInit() {
  }

  loadDiscoveries() {
    this.dataService.getInsektenFunde().subscribe((data: Beobachtung[]) => this.refreshData(data));
  }

  refreshData(beobachtungen: Beobachtung[]) {
    this.beobachtungen = [];

    beobachtungen.forEach(beobachtung => {
      if (this.fromDate != null && this.toDate != null) {
        if (beobachtung.datum >= this.fromDate && beobachtung.datum <= this.toDate) {
          beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);
          this.beobachtungen.push(beobachtung);
        }
      } else {
        beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);
        this.beobachtungen.push(beobachtung);
      }
    });
    
    this.sortList("ASC");
    
    // nachdem wir aufsteigend sortiert haben, können wir das Start- und Endedatum ermitteln
    if (this.fromDate == null) {
      this.fromDate = this.beobachtungen[0].datum;
    }
    if (this.toDate == null) {
      this.toDate = this.beobachtungen[this.beobachtungen.length-1].datum;
    }
  }

  sortList(sortorder: string) {
    this.beobachtungen.sort((a, b) => {
      var result = 0;

      if (a.datum < b.datum) {
        result = -1;
      } else if (a.datum > b.datum) {
        result = 1;
      }

      if (sortorder == "DESC") {
        result *= -1;
      }
      
      return result;
    });
  }

  filterByFromDate(fromDate) {
    this.fromDate = fromDate;
    this.loadDiscoveries();
  }

  filterByToDate(toDate) {
    this.toDate = toDate;
    this.loadDiscoveries();
  }

  /**
   * Update current page of items
   * 
   * @param pageOfItems 
   */
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfBeobachtungen = pageOfItems;
  }

}
