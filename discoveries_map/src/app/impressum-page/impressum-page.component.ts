import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';


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

  constructor() {
    this.name = environment.impressumName;
    this.street = environment.impressumStreet;
    this.postalcode = environment.impressumPostalcode;
    this.city = environment.impressumCity;
    this.telephone = environment.impressumTelephone;
    this.email = environment.impressumEmail;
  }

  ngOnInit() {
  }

}
