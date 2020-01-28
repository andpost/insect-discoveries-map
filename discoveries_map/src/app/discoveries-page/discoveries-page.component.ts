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
      beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);

      this.beobachtungen.push(beobachtung);
    });

    this.beobachtungen.sort((a, b) => {
      if (a.datum < b.datum) {
        return -1;
      } else if (a.datum > b.datum) {
        return 1;
      }
      return 0;
    });
  }

}
