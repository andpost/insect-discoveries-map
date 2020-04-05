import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { DataService } from '../app.dataservice';
import { Impressum } from '../impressum-entity';

@Component({
  selector: 'app-impressum-page',
  templateUrl: './impressum-page.component.html',
  styleUrls: ['./impressum-page.component.css']
})
export class ImpressumPageComponent implements OnInit {

  name: string;
  street: string;
  postalcode: string;
  city: string;
  telephone: string;
  email: string;
  disclaimer: string;

  constructor(private dataService: DataService) {
    this.dataService.getImpressumData(environment.impressumDataSource).subscribe((data : Impressum) => this.setImpressumData(data)); 
  }

  ngOnInit() {
  }

  setImpressumData(impressum: Impressum) {
    this.name = impressum.name;
    this.street = impressum.street;
    this.postalcode = impressum.postalcode;
    this.city = impressum.city;
    this.telephone = impressum.telephone;
    this.email = impressum.email;
    this.disclaimer = impressum.disclaimer;
  }

}
