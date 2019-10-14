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
  artlist = [];
  ordnunglist = [];
  selectedArt : string;
  selectedOrdnung : string;
  SHOW_ALL : string = "<ALLE>";

  constructor(private dataService: DataService) {
    this.artlist.push(this.SHOW_ALL);
    this.ordnunglist.push(this.SHOW_ALL);
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
    this.artlist = [];
    this.artlist.push(this.SHOW_ALL);

    this.ordnunglist = [];
    this.ordnunglist.push(this.SHOW_ALL);

    discoveries.forEach(discovery => {
      if (this.isSelected(this.selectedArt, discovery.art) && this.isSelected(this.selectedOrdnung, discovery.ordnung)) {
        var marker = L.marker([discovery.lat, discovery.lon], this.getMarkerIcon(discovery)).addTo(this.map);
        marker.bindPopup(this.getMarkerPopupHtml(discovery)).openPopup();
        this.shownMarkers.push(marker);

        if (!this.artlist.includes(discovery.art)) {
          this.artlist.push(discovery.art);
        }
        if (!this.ordnunglist.includes(discovery.ordnung)) {
          this.ordnunglist.push(discovery.ordnung);
        }
      }
      /*
      // nothing selected in UI, show all
      if (this.isNoSelection(this.selectedArt) && this.isNoSelection(this.selectedOrdnung)) {
        var marker = L.marker([discovery.lat, discovery.lon], this.getMarkerIcon(discovery)).addTo(this.map);
        marker.bindPopup(this.getMarkerPopupHtml(discovery)).openPopup();
        this.shownMarkers.push(marker);
      // ordnung is not selected, but art
      } else if (this.isNoSelection(this.selectedOrdnung)) {
        if (discovery.art == this.selectedArt) {
          var marker = L.marker([discovery.lat, discovery.lon], this.getMarkerIcon(discovery)).addTo(this.map);
          marker.bindPopup(this.getMarkerPopupHtml(discovery)).openPopup();
          this.shownMarkers.push(marker);
        }
      } else {
        
        if (discovery.art == this.selectedArt) {
          var marker = L.marker([discovery.lat, discovery.lon], this.getMarkerIcon(discovery)).addTo(this.map);
          marker.bindPopup(this.getMarkerPopupHtml(discovery)).openPopup();
          this.shownMarkers.push(marker);
        }
      }
      */
      
    });
    this.artlist.sort();
    this.ordnunglist.sort();
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

  removeMarkers() {
    this.shownMarkers.forEach(marker => this.map.removeLayer(marker));
  }

  
}
