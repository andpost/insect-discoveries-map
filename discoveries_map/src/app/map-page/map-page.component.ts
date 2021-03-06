import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';
import { Beobachtung } from "../beobachtung-entity";
import { DataService } from '../app.dataservice';
declare let L;

@Component({
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

    this.htmlEntityMap.set("ß", "&szlig;");
  }

  ngOnInit() {
    this.map = L.map('map').setView([this.lat, this.lng], this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  listInsektenFunde() {
    this.dataService.getInsektenFunde().subscribe((data: Beobachtung[]) => this.showInsektenFundeOnMap(data));
  }

  showInsektenFundeOnMap(insektenFunde: Beobachtung[]) {
    this.artList = [];
    this.artList.push(this.SHOW_ALL);

    this.ordnungList = [];
    this.ordnungList.push(this.SHOW_ALL);

    this.beobachterList = [];
    this.beobachterList.push(this.SHOW_ALL);

    insektenFunde.forEach(insekt => {
      if (this.isSelected(this.selectedArt, insekt.art.nameDeutsch) //
          && this.isSelected(this.selectedOrdnung, insekt.art.ordnung) //
          && this.isSelected(this.selectedBeobachter, insekt.beobachter)) {
        var marker = L.marker([insekt.lat, insekt.lon], this.getMarkerIcon(insekt)).addTo(this.map);
        marker.bindPopup(this.getMarkerPopupHtml(insekt));
        this.shownMarkers.push(marker);

        if (!this.artList.includes(insekt.art.nameDeutsch)) {
          this.artList.push(insekt.art.nameDeutsch);
        }
        if (!this.ordnungList.includes(insekt.art.ordnung)) {
          this.ordnungList.push(insekt.art.ordnung);
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

  getMarkerIcon(insekt: Beobachtung) {
    return this.markerIcon;
  }

  getMarkerPopupHtml(insekt: Beobachtung) {
    var htmlImg = "";

    if (insekt.art.foto != null && insekt.art.foto.src != null) {
      htmlImg = "<img src=\"assets/images/" + insekt.art.foto.src + "\" alt=\"Icon\" class=\"img-thumbnail\" />";
    }

    var htmlArt = "<b>"
    + "<a href=\"" + this.createSpeciesLink(insekt) + "\">" + this.encodeHtmlEntities(insekt.art.nameDeutsch) + "</a>"
    + "</b><br /><i>" + insekt.art.name + "</i><br />" + insekt.art.ordnung;

    var html = "<table><tr><td>" + htmlArt + "</td><td style=\"text-align: right;\">" + htmlImg + "</td></tr>"
      + "<tr><td colspan=\"2\"><i class=\"fa fa-calendar fa-fw\" style=\"color: #999;\"></i> " 
      + this.dataService.formatDateString(insekt.datum) + " - " + insekt.stadium + "</td></tr>"
      + "<tr><td colspan=\"2\"><i class=\"fa fa-map-marker fa-fw\" style=\"color: #999;\"></i> " + this.encodeHtmlEntities(insekt.fundort) + "</td></tr>"
      + "<tr><td colspan=\"2\"><i class=\"fa fa-binoculars fa-fw\" style=\"color: #999;\"></i> " + this.encodeHtmlEntities(insekt.beobachter) + "</td></tr>"
      + "<tr><td colspan=\"2\"><i class=\"fa fa-hashtag fa-fw\" style=\"color: #999;\"></i> " + insekt.anzahl + "</td></tr>"
      + "<tr><td colspan=\"2\"><i class=\"fa fa-check fa-fw\" style=\"color: #999;\"></i> " + insekt.pruefung; + "</td></tr>"
      + "</table>"

      return html;
  }

  /**
   * Creates a link for a species. Depending on the env config for hash location strategy, a hash gets inserted in the link.
   * @param beobachtung
   */
  createSpeciesLink(beobachtung : Beobachtung) : string {
    var link = "";

    if (environment.routerUseHash) {
      link += "#";
    }

    link += "/arten?art=" + beobachtung.art.name;

    return link;
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
