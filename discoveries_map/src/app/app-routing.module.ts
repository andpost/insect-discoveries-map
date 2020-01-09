import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { SpeciesPageComponent } from './species-page/species-page.component';


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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
