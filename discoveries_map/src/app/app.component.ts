import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DiscoveryEntity } from "./app.discovery-entity";
import { DataService } from './app.dataservice';
declare let L;

@Component({
  providers: [DataService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'Insect discoveries map';

  lat: number = 50.929444;
  lng: number = 13.458333;
  zoom: number = 8;
  map: any;
  markerIcon: any;
  markerIconGreen: any;
  beobachter: string;
  entityMap : Map<string, string> = new Map();
  shownMarkers = new Array();
  artList = [];
  ordnungList = [];
  beobachterList = [];
  selectedArt : string;
  selectedOrdnung : string;
  selectedBeobachter : string;
  SHOW_ALL : string = "<ALLE>";

  constructor(private dataService: DataService) {
    //this.artList.push(this.SHOW_ALL);
    //this.ordnungList.push(this.SHOW_ALL);
    //this.beobachterList.push(this.SHOW_ALL);
    this.listDiscoveries();

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

    this.entityMap.set("ß", "&szlig;")
  }

  ngOnInit() {
    this.map = L.map('map').setView([this.lat, this.lng], this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  listDiscoveries() {
    this.dataService.getDiscoveries().subscribe((data: DiscoveryEntity[]) => this.showDiscoveries(data))
  }

  showDiscoveries(discoveries: DiscoveryEntity[]) {
    this.artList = [];
    this.artList.push(this.SHOW_ALL);

    this.ordnungList = [];
    this.ordnungList.push(this.SHOW_ALL);

    this.beobachterList = [];
    this.beobachterList.push(this.SHOW_ALL);

    discoveries.forEach(discovery => {
      if (this.isSelected(this.selectedArt, discovery.art) //
          && this.isSelected(this.selectedOrdnung, discovery.ordnung) //
          && this.isSelected(this.selectedBeobachter, discovery.beobachter)) {
        var marker = L.marker([discovery.lat, discovery.lon], this.getMarkerIcon(discovery)).addTo(this.map);
        marker.bindPopup(this.getMarkerPopupHtml(discovery)).openPopup();
        this.shownMarkers.push(marker);

        if (!this.artList.includes(discovery.art)) {
          this.artList.push(discovery.art);
        }
        if (!this.ordnungList.includes(discovery.ordnung)) {
          this.ordnungList.push(discovery.ordnung);
        }
        if (!this.beobachterList.includes(discovery.beobachter)) {
          this.beobachterList.push(discovery.beobachter);
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

  isSelected(selection : string, discovery : string) : boolean {
    if (selection == null || selection == this.SHOW_ALL || selection == discovery) {
      return true;
    }
    return false;
  }

  getMarkerIcon(discovery: DiscoveryEntity) {
    if (this.beobachter == null) {
      this.beobachter = discovery.beobachter;
    }
    if (this.beobachter != discovery.beobachter) {
      return this.markerIconGreen;
    }
    return this.markerIcon;
  }

  getMarkerPopupHtml(discovery: DiscoveryEntity) {
    return "<b>" + this.encodeHtmlEntities(discovery.art) + "</b> <i>" + discovery.artLatin + "</i>"
      + "<br />" + discovery.ordnung
      + "<br />" + discovery.datum + " - " + discovery.einheit
      + "<br />Fundort: " + this.encodeHtmlEntities(discovery.fundort)
      + "<br />Beobachter: " + this.encodeHtmlEntities(discovery.beobachter)
      + "<br />Anzahl: " + discovery.anzahl;
  }

  encodeHtmlEntities(stringToEncode: string) {
    this.entityMap.forEach((value: string, key: string) => {
      var regex = new RegExp(key, 'g');
      stringToEncode = stringToEncode.replace(regex, value);
    });
    return stringToEncode;
  }

  filterSelectedArt(selectedArt: string) {
    this.removeMarkers();
    this.selectedArt = selectedArt;
    this.listDiscoveries();
  }

  filterSelectedOrdnung(selectedOrdnung: string) {
    this.removeMarkers();
    this.selectedOrdnung = selectedOrdnung;
    this.listDiscoveries();
  }

  filterSelectedBeobachter(selectedBeobachter: string) {
    this.removeMarkers();
    this.selectedBeobachter = selectedBeobachter;
    this.listDiscoveries();
  }

  removeMarkers() {
    this.shownMarkers.forEach(marker => this.map.removeLayer(marker));
  }

  
}
