import {RouterModule} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPageComponent } from './map-page/map-page.component';
import { SpeciesPageComponent } from './species-page/species-page.component';

import { LightboxModule } from 'ngx-lightbox';
import { IndexPageComponent } from './index-page/index-page.component';

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
    LightboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
