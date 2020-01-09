import { Component, OnInit } from '@angular/core';
import { DataService } from '../app.dataservice';
import { Art } from "../art-entity";

@Component({
  providers: [DataService],
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  anzahlArten : number;
  anzahlOrdnungen : number;
  anzahlBeobachtungen : number;
  anzahlArtenMitFotos : number;
  anzahlFotos : number;
  artenProOrdnung : Map<string, number> = new Map();

  constructor(private dataService: DataService) { 
    this.loadDataAndCreateStatistics();
  }

  ngOnInit() {
  }

  loadDataAndCreateStatistics() {
    this.dataService.getArten().subscribe((data: Art[]) => this.createStatistics(data));
  }

  createStatistics(arten : Art[]) {
    this.anzahlArten = arten.length;
    this.anzahlBeobachtungen = 0;
    this.anzahlFotos = 0;
    this.anzahlArtenMitFotos = 0;

    var ordnungList = [];

    arten.forEach(art => {
      if (!this.artenProOrdnung.has(art.ordnung)) {
        this.artenProOrdnung.set(art.ordnung, 0);
      }

      var anzahlArtenProOrdnung = this.artenProOrdnung.get(art.ordnung);
      anzahlArtenProOrdnung ++;
      this.artenProOrdnung.set(art.ordnung, anzahlArtenProOrdnung);

      if (art.beobachtungen != null) {
        this.anzahlBeobachtungen += art.beobachtungen.length;

        var hasFotos = false;

        art.beobachtungen.forEach(beobachtung => {
          if (beobachtung.fotos != null) {
            hasFotos = true;
            this.anzahlFotos += beobachtung.fotos.length;
          }
        });

        if (hasFotos) {
          this.anzahlArtenMitFotos ++;
        }
      }
      if (!ordnungList.includes(art.ordnung)) {
        ordnungList.push(art.ordnung);
      }
    });

    this.anzahlOrdnungen = ordnungList.length;
  }

}