import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { IndexPageComponent } from './index-page/index-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { SpeciesPageComponent } from './species-page/species-page.component';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';
import { DiscoveriesPageComponent } from './discoveries-page/discoveries-page.component';
import { LinksPageComponent } from "./links-page/links-page.component";


const routes: Routes = [
  {
    path: 'karten',
    component: MapPageComponent
  },
  {
    path: 'arten',
    component: SpeciesPageComponent
  },
  {
    path: 'beobachtungen',
    component: DiscoveriesPageComponent
  },
  {
    path: 'links',
    component: LinksPageComponent
  },
  {
    path: 'impressum',
    component: ImpressumPageComponent
  },
  {
    path: '',
    component: IndexPageComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: environment.routerUseHash})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
