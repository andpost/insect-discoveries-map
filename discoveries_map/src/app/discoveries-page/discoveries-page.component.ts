import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

import { Beobachtung } from "../beobachtung-entity";
import { DataService } from '../app.dataservice';
import { Foto } from '../foto-entity';

@Component({
  selector: 'app-discoveries-page',
  templateUrl: './discoveries-page.component.html',
  styleUrls: ['./discoveries-page.component.css']
})
export class DiscoveriesPageComponent implements OnInit {

  beobachtungen : Beobachtung[];
  beobachtungenPerPage : Beobachtung[];
  fromDate : string;
  toDate : string;
  sortorder = "DESC";

  constructor(private dataService: DataService, private lightbox: Lightbox) { 
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
          //beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);
          this.beobachtungen.push(this.prepareBeobachtung(beobachtung));
        }
      } else {
        //beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);
        this.beobachtungen.push(this.prepareBeobachtung(beobachtung));
      }
    });
    
    this.sortList(this.sortorder);
    
    // nachdem wir aufsteigend sortiert haben, können wir das Start- und Endedatum ermitteln
    if (this.fromDate == null) {
      this.fromDate = this.beobachtungen[0].datum;
    }
    if (this.toDate == null) {
      this.toDate = this.beobachtungen[this.beobachtungen.length-1].datum;
    }
  }

  prepareBeobachtung(beobachtung : Beobachtung) {
    beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);

    if (beobachtung.fotos != null) {
      beobachtung.fotos.forEach(foto => {
        var copyRight = beobachtung.beobachter;

        if (foto.altCopyright != null) {
          copyRight = foto.altCopyright;
        }

        if (!foto.src.startsWith("assets/images/")) {
          foto.src = "assets/images/" + foto.src;
        }
        
        foto.thumb = foto.src.replace(".jpg", "_thumb.jpg");
        foto.caption = beobachtung.art.nameDeutsch + " - " + beobachtung.fundort + " (&copy; " + 
          this.dataService.getYearFromDateString(beobachtung.datum) + ", " + copyRight + ")";
      });
    }
    return beobachtung;
  }

  sortList(order: string) {
    this.sortorder = order;

    this.beobachtungen.sort((a, b) => {
      var result = 0;

      if (a.datum < b.datum) {
        result = -1;
      } else if (a.datum > b.datum) {
        result = 1;
      }

      if (this.sortorder == "DESC") {
        result *= -1;
      }
      
      return result;
    });

    /*
     * Reassign the instance to trigger reloading after data changed.
     *
     * https://github.com/FERNman/angular-google-charts/issues/39
     */
    this.beobachtungen = Object.assign([], this.beobachtungen)
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
    this.beobachtungenPerPage = pageOfItems;
  }

  /**
   * To use '&copy;' in a title attribute for img tags, we have to convert it - its not converted due to security reasons.
   * 
   * @param imgTitle 
   */
  convertBackCopyRightEntity(imgTitle: string) {
    return imgTitle.replace('&copy;', '©');
  }

  open(fotos : Foto[], index: number): void {
    // open lightbox
    this.lightbox.open(fotos, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

}
