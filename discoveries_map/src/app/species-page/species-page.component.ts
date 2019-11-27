import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Art } from "../art-entity";
import { DataService } from '../app.dataservice';
import { InsektenFund } from '../insektenfund-entity';

@Component({
  providers: [DataService],
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.css']
})
export class SpeciesPageComponent implements OnInit {

  arten : Art[];
  selectedArt : Art;
  artenFunde : InsektenFund[];

  constructor(private dataService: DataService) { 
    this.loadArtList();
  }

  ngOnInit() {
  }

  loadArtList() {
    this.dataService.getArten().subscribe((data: Art[]) => this.showArten(data));
  }

  showArten(arten : Art[]) {
    this.arten = arten;
  }

  loadFundeForArt(art: Art) {
    this.dataService.getInsektenFunde().subscribe((data: InsektenFund[]) => this.showFundeForArt(art, data));
  }

  showFundeForArt(art: Art, insektenFunde: InsektenFund[]) {
    this.selectedArt = art;
    this.artenFunde = [];

    insektenFunde.forEach(insekt => {
      if (insekt.artLatin == art.name) {
        this.artenFunde.push(insekt);
      }
    });
  }

}
