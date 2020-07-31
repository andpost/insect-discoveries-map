import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { SpeciesPageComponent } from './species-page/species-page.component';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';
import { DiscoveriesPageComponent } from './discoveries-page/discoveries-page.component';


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
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
