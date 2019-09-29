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

  constructor(private dataService: DataService) {
    this.listDiscoveries();

    this.markerIcon = {
      icon: L.icon({
        iconUrl: "assets/leaflet/images/marker-icon.png",
        shadowUrl: 'assets/leaflet/images/marker-shadow.png'
      })
    };
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
      var marker = L.marker([discovery.lat, discovery.lon], this.markerIcon).addTo(this.map);
      marker.bindPopup(this.getMarkerPopupHtml(discovery)).openPopup();
    });
  }

  getMarkerPopupHtml(discovery: DiscoveryEntity) {
    return "Art: " + discovery.art + "<br />" + "(" + discovery.artLatin + ")<br />Datum: " + discovery.datum;
  }
}
