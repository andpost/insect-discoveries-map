import {RouterModule} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LightboxModule } from 'ngx-lightbox';
import { GoogleChartsModule } from 'angular-google-charts';
import { ScriptLoaderService } from 'angular-google-charts';

import { SpeciesPageComponent } from './species-page/species-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';
import { DiscoveriesPageComponent } from './discoveries-page/discoveries-page.component';
import { LinksPageComponent } from './links-page/links-page.component';
import { JwPaginationComponent } from './pagination/jw-angular-pagination.component';
import { GenusPageComponent } from './genus-page/genus-page.component';
import { SpeciesDetailsComponent } from './species-details/species-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MapPageComponent,
    SpeciesPageComponent,
    IndexPageComponent,
    ImpressumPageComponent,
    DiscoveriesPageComponent,
    LinksPageComponent,
    JwPaginationComponent,
    GenusPageComponent,
    SpeciesDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LightboxModule,
    GoogleChartsModule
  ],
  providers: [ScriptLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
