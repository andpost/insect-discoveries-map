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

  lat: number = 51.083422;
  lng: number = 13.700582;
  zoom: number = 10;
  map: any;
  markerIcon: any;
  markerIconGreen: any;
  beobachter: string;
  entityMap : Map<string, string> = new Map();

  constructor(private dataService: DataService) {
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
    discoveries.forEach(discovery => {
      var marker = L.marker([discovery.lat, discovery.lon], this.getMarkerIcon(discovery)).addTo(this.map);
      marker.bindPopup(this.getMarkerPopupHtml(discovery)).openPopup();
    });
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

  
}
