import { Component, OnInit, Input } from '@angular/core';

import { Art } from "../art-entity";
import { Beobachtung } from "../beobachtung-entity";
import { Foto } from '../foto-entity';

import { DataService } from '../app.dataservice';

import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {

  @Input() art : Art;
  @Input() artenFunde : Beobachtung[];
  @Input() artenFotos : Foto[];
  
  chartData = [];
  chartType = 'ColumnChart';
  chartWidth = 700;
  chartHeight = 200;
  chartOptions = {
    legend: { position: 'top' },
    isStacked : true
  };
  chartColumnNames = ["", "Imago", "Larve", "Puppe"];
  chartVisible = false;

  constructor(private dataService: DataService, private lightbox: Lightbox) { }

  ngOnInit() {
    this.showDiscoveriesForSpecies(this.art);
  }

  showDiscoveriesForSpecies(art: Art) {
    this.artenFunde = art.beobachtungen;
    this.artenFotos = [];

    //this.chartData = [];

    this.artenFunde.forEach(beobachtung => {
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
          foto.caption = art.nameDeutsch + " - " + beobachtung.fundort + " (&copy; " + 
            this.dataService.getYearFromDateString(beobachtung.datum) + ", " + copyRight + ")";
          
          this.artenFotos.push(foto);
        });
      }
    });
  }

  /**
   * Create phenogram chart data only after button was clicked.
   * 
   * When chart data gets created while accordion card is showing, chart legend lables are not showing at second time.
   * 
   * @see https://stackoverflow.com/questions/54483778/why-google-charts-missing-legend-text-while-loading-second-time
   * @param art The selected species.
   */
   togglePhenogram(art: Art) {

    this.chartData = [];

    this.chartVisible = !this.chartVisible;

    if (!this.chartVisible) {
      return;
    }

    var beobachtungJeMonatImago = [];
    var beobachtungJeMonatLarve = [];
    var beobachtungJeMonatPuppe = [];
    var length = 12;

    for (var i = 0; i < length; i++) {
      beobachtungJeMonatImago.push(0);
      beobachtungJeMonatLarve.push(0);
      beobachtungJeMonatPuppe.push(0);
    }

    this.artenFunde.forEach(beobachtung => {
      // create stats
      var monthIdx = this.dataService.getMonthIndexFromDateString(beobachtung.datum);

      if (beobachtung.stadium == "Imago") {
        beobachtungJeMonatImago[monthIdx] += beobachtung.anzahl;
      } else if (beobachtung.stadium == "Larve") {
        beobachtungJeMonatLarve[monthIdx] += beobachtung.anzahl;
      } else if (beobachtung.stadium == "Puppe") {
        beobachtungJeMonatPuppe[monthIdx] += beobachtung.anzahl;
      }
      
    });

    for (var i = 0; i < length; i++) {
      this.chartData.push([this.dataService.getMonthName(i), beobachtungJeMonatImago[i], beobachtungJeMonatLarve[i], beobachtungJeMonatPuppe[i]]);
    }
  }

  /**
   * To use '&copy;' in a title attribute for img tags, we have to convert it - its not converted due to security reasons.
   * 
   * @param imgTitle 
   */
   convertBackCopyRightEntity(imgTitle: string) {
    return imgTitle.replace('&copy;', '©');
   }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.artenFotos, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

}
