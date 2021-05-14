import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

import { DataService } from '../app.dataservice';
import { Gattung } from '../gattung-entity';
import { Foto } from '../foto-entity';

@Component({
  selector: 'app-genus-page',
  templateUrl: './genus-page.component.html',
  styleUrls: ['./genus-page.component.css']
})
export class GenusPageComponent implements OnInit {

  gattungen : Gattung[];
  ordnungList = [];
  selectedOrdnungen : Map<string, boolean> = new Map();

  constructor(private dataService: DataService, private lightbox: Lightbox) {
    this.loadGattungList();
  }

  ngOnInit() {
  }

  loadGattungList() {
    this.dataService.getGattungen().subscribe((data: Gattung[]) => this.showGattungen(data));
  }

  showGattungen(gattungen : Gattung[]) {
    this.gattungen = [];

    gattungen.forEach(gattung => {
      // wenn noch nicht vorhanden, dann nun einfügen
      if (this.selectedOrdnungen.get(gattung.ordnung) == null) {
        this.selectedOrdnungen.set(gattung.ordnung, true);
      }

      if (this.selectedOrdnungen.get(gattung.ordnung)) {
        if (gattung.icon != null && gattung.icon.src != null) {
          gattung.icon.src = "assets/images/" + gattung.icon.src;
        }
        this.gattungen.push(this.prepareGattung(gattung));
      }
    });
  }

  prepareGattung(gattung : Gattung) {
    if (gattung.fotos != null) {
      gattung.fotos.forEach(foto => {
        if (!foto.src.startsWith("assets/images/")) {
          foto.src = "assets/images/" + foto.src;
        }
        
        foto.thumb = foto.src.replace(".jpg", "_thumb.jpg");
        foto.caption = foto.titel + " (&copy; " + foto.altCopyright + ")";
      });
    }
    return gattung;
  }

  filterSelectedOrdnung(ordnung: string, isSelected: boolean) {
    this.selectedOrdnungen.set(ordnung, isSelected);
    this.loadGattungList();
  }

  selectAllOrdnungen(isSelected: boolean) {
    this.selectedOrdnungen.forEach((value: boolean, key: string) => {
      this.selectedOrdnungen.set(key, isSelected);
    });
    this.loadGattungList();
  }

  open(fotos : Foto[], index: number): void {
    // open lightbox
    this.lightbox.open(fotos, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
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
