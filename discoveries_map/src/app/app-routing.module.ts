import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    redirectTo: '/karten',
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: '/karten',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
