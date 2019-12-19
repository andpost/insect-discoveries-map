import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Art } from "../art-entity";
import { Beobachtung } from "../beobachtung-entity";
import { DataService } from '../app.dataservice';
import { Artfoto } from '../artfoto-entity';

@Component({
  providers: [DataService],
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.css']
})
export class SpeciesPageComponent implements OnInit {

  ordnungList = [];
  arten : Art[];
  selectedArt : Art;
  artenFunde : Beobachtung[];
  artenFotos : Artfoto[];
  selectedOrdnung : string;

  constructor(private dataService: DataService) { 
    this.loadArtList();
  }

  ngOnInit() {
  }

  loadArtList() {
    this.dataService.getArten().subscribe((data: Art[]) => this.showArten(data));
  }

  showArten(arten : Art[]) {
    this.arten = [];
    if (this.selectedOrdnung == null) {
      this.selectedOrdnung = arten[0].ordnung;
    }

    arten.forEach(art => {
      if (art.ordnung == this.selectedOrdnung) {
        this.arten.push(art);
      }

      if (!this.ordnungList.includes(art.ordnung)) {
        this.ordnungList.push(art.ordnung);
      }
    });
  }

  showFundeForArt(art: Art) {
    this.selectedArt = art;
    this.artenFunde = art.beobachtungen;
    this.artenFotos = [];

    this.artenFunde.forEach(beobachtung => {
      beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);

      beobachtung.fotos.forEach(foto => this.artenFotos.push(foto));
    });
    
  }

  filterSelectedOrdnung(selectedOrdnung: string) {
    this.selectedOrdnung = selectedOrdnung;
    this.loadArtList();
  }
}
