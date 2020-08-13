import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Observable } from "rxjs";
import { Art } from "../art-entity";
import { Beobachtung } from "../beobachtung-entity";
import { DataService } from '../app.dataservice';
import { Artfoto } from '../artfoto-entity';
import { Lightbox } from 'ngx-lightbox';
import { ArrayType } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  providers: [Lightbox],
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.css']
})
export class SpeciesPageComponent implements OnInit {

  ordnungList = [];
  arten : Art[];
  filteredArten : Art[];
  selectedArt : Art;
  artenFunde : Beobachtung[];
  artenFotos : Artfoto[];
  selectedOrdnungen : Map<string, boolean> = new Map();
  art : string;

  constructor(private dataService: DataService, private lightbox: Lightbox, private sanitizer: DomSanitizer, private route: ActivatedRoute) { 
    this.loadArtList();
  }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.art)
    .subscribe(params => {
      this.art = params.art;
    }
  );
  }

  loadArtList() {
    this.dataService.getArten().subscribe((data: Art[]) => this.showArten(data));
  }

  showArten(arten : Art[]) {
    this.arten = [];

    arten.forEach(art => {
      // wenn noch nicht vorhanden, dann nun einfügen
      if (this.selectedOrdnungen.get(art.ordnung) == null) {
        this.selectedOrdnungen.set(art.ordnung, true);
      }

      if (this.selectedOrdnungen.get(art.ordnung)) {
        this.arten.push(art);
      }
    });

    this.filteredArten = this.arten;

    if (this.art != null) {
      this.filterBySearch(this.art);
    }
  }

  showFundeForArt(art: Art) {
    this.selectedArt = art;
    this.artenFunde = art.beobachtungen;
    this.artenFotos = [];

    this.artenFunde.forEach(beobachtung => {
      beobachtung.datumFormattiert = this.dataService.formatDateString(beobachtung.datum);

      if (beobachtung.fotos != null) {
        beobachtung.fotos.forEach(foto => {
          var copyRight = beobachtung.beobachter;

          if (foto.altCopyright != null) {
            copyRight = foto.altCopyright;
          }

          foto.src = "assets/images/" + foto.bildPfad;
          foto.thumb = "assets/images/" + foto.thumbnailPfad;
          foto.caption = art.nameDeutsch + " - " + beobachtung.fundort + " (&copy; " + 
            this.dataService.getYearFromDateString(beobachtung.datum) + ", " + copyRight + ")";
          
          this.artenFotos.push(foto);
        });
      }
    });
    
  }

  filterSelectedOrdnung(ordnung: string, isSelected: boolean) {
    this.selectedOrdnungen.set(ordnung, isSelected);
    this.loadArtList();
  }

  selectAllOrdnungen(isSelected: boolean) {
    this.selectedOrdnungen.forEach((value: boolean, key: string) => {
      this.selectedOrdnungen.set(key, isSelected);
    });
    this.loadArtList();
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.artenFotos, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

  filterBySearch(search: string) {
    this.filteredArten = [];

    if (search == null || search.length == 0) {
      this.filteredArten = this.arten;
      return;
    }

    this.arten.forEach(art => {
      if (this.isMatchForArt(art, search)) {
        this.filteredArten.push(art);
      }
    });
  }

  isMatchForArt(art: Art, search: string) : boolean {
    var nameLC = art.name.toLocaleLowerCase();
    var nameDeutschLC = art.nameDeutsch.toLocaleLowerCase();
    var searchLC = search.toLocaleLowerCase();
    var familieLC = "";

    if (art.familie != null) {
      familieLC = art.familie.toLocaleLowerCase();
    }

    return nameLC.startsWith(searchLC) || nameLC.includes(searchLC) 
      || nameDeutschLC.startsWith(searchLC) || nameDeutschLC.includes(searchLC)
      || familieLC.startsWith(searchLC) || familieLC.includes(searchLC);
  }

  /**
   * To use '&copy;' in a title attribute for img tags, we have to convert it - its not converted due to security reasons.
   * 
   * @param imgTitle 
   */
  convertBackCopyRightEntity(imgTitle: string) {
    return imgTitle.replace('&copy;', '©');
  }
}
