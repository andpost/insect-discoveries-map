import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InsektenFund } from "../app.insektenfund-entity";
import { DataService } from '../app.dataservice';
declare let L;

@Component({
  providers: [DataService],
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  title = 'Karte mit Insektenfunden';

  lat: number = 51.15;
  lng: number = 13.8;
  zoom: number = 9;
  map: any;
  markerIcon: any;
  markerIconGreen: any;
  beobachter: string;
  htmlEntityMap : Map<string, string> = new Map();
  shownMarkers = new Array();
  artList = [];
  ordnungList = [];
  beobachterList = [];
  selectedArt : string;
  selectedOrdnung : string;
  selectedBeobachter : string;
  SHOW_ALL : string = "<ALLE>";

  constructor(private dataService: DataService) {
    this.listInsektenFunde();

    this.markerIcon = {
      icon: L.icon({
        iconUrl: "assets/leaflet/images/marker-icon.png",
        shadowUrl: 'assets/leaflet/images/marker-shadow.png'
      })
    };
    this.markerIconGreen = {
      icon: L.icon({
        iconUrl: "assets/leaflet/images/marker-icon-green.png",
        shadowUrl: 'assets/leaflet/images/marker-shadow.png'
      })
    };

    this.htmlEntityMap.set("ß", "&szlig;")
  }

  ngOnInit() {
    this.map = L.map('map').setView([this.lat, this.lng], this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  listInsektenFunde() {
    this.dataService.getInsektenFunde().subscribe((data: InsektenFund[]) => this.showInsektenFundeOnMap(data))
  }

  showInsektenFundeOnMap(insektenFunde: InsektenFund[]) {
    this.artList = [];
    this.artList.push(this.SHOW_ALL);

    this.ordnungList = [];
    this.ordnungList.push(this.SHOW_ALL);

    this.beobachterList = [];
    this.beobachterList.push(this.SHOW_ALL);

    insektenFunde.forEach(insekt => {
      if (this.isSelected(this.selectedArt, insekt.art) //
          && this.isSelected(this.selectedOrdnung, insekt.ordnung) //
          && this.isSelected(this.selectedBeobachter, insekt.beobachter)) {
        var marker = L.marker([insekt.lat, insekt.lon], this.getMarkerIcon(insekt)).addTo(this.map);
        marker.bindPopup(this.getMarkerPopupHtml(insekt));
        this.shownMarkers.push(marker);

        if (!this.artList.includes(insekt.art)) {
          this.artList.push(insekt.art);
        }
        if (!this.ordnungList.includes(insekt.ordnung)) {
          this.ordnungList.push(insekt.ordnung);
        }
        if (!this.beobachterList.includes(insekt.beobachter)) {
          this.beobachterList.push(insekt.beobachter);
        }
      }
      
    });
    this.artList.sort();
    this.ordnungList.sort();
    this.beobachterList.sort();
  }

  isNoSelection(selection : string) : boolean {
    return selection == null || selection == this.SHOW_ALL;
  }

  /**
   * Checks if the stringToCheck value is selected in the UI. Returns also true if this.SHOW_ALL is selected.
   * 
   * @param selection Selection in UI.
   * @param stringToCheck 
   */
  isSelected(selection : string, stringToCheck : string) : boolean {
    if (selection == null || selection == this.SHOW_ALL || selection == stringToCheck) {
      return true;
    }
    return false;
  }

  getMarkerIcon(insekt: InsektenFund) {
    if (this.beobachter == null) {
      this.beobachter = insekt.beobachter;
    }
    if (this.beobachter != insekt.beobachter) {
      return this.markerIconGreen;
    }
    return this.markerIcon;
  }

  getMarkerPopupHtml(insekt: InsektenFund) {
    return "<b>" + this.encodeHtmlEntities(insekt.art) + "</b> <i>" + insekt.artLatin + "</i>"
      + "<br />" + insekt.ordnung
      + "<br />" + insekt.datum + " - " + insekt.einheit
      + "<br />Fundort: " + this.encodeHtmlEntities(insekt.fundort)
      + "<br />Beobachter: " + this.encodeHtmlEntities(insekt.beobachter)
      + "<br />Anzahl: " + insekt.anzahl
      + "<br />Fundpr&uuml;fung: " + insekt.fundPruefung;
  }

  encodeHtmlEntities(stringToEncode: string) {
    this.htmlEntityMap.forEach((value: string, key: string) => {
      var regex = new RegExp(key, 'g');
      stringToEncode = stringToEncode.replace(regex, value);
    });
    return stringToEncode;
  }

  filterSelectedArt(selectedArt: string) {
    this.removeMarkers();
    this.selectedArt = selectedArt;
    this.listInsektenFunde();
  }

  filterSelectedOrdnung(selectedOrdnung: string) {
    this.removeMarkers();
    this.selectedOrdnung = selectedOrdnung;
    this.listInsektenFunde();
  }

  filterSelectedBeobachter(selectedBeobachter: string) {
    this.removeMarkers();
    this.selectedBeobachter = selectedBeobachter;
    this.listInsektenFunde();
  }

  removeMarkers() {
    this.shownMarkers.forEach(marker => this.map.removeLayer(marker));
  }

  
}
