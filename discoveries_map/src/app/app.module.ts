import {RouterModule} from "@angular/router";
import { BrowserModule, Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LightboxModule } from 'ngx-lightbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SpeciesPageComponent } from './species-page/species-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { IndexPageComponent } from './index-page/index-page.component';
import {DataService} from "./app.dataservice";

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    MapPageComponent,
    SpeciesPageComponent,
    IndexPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LightboxModule,
    FontAwesomeModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
