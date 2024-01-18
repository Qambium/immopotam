import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { AppartementComponent } from './appartement/appartement.component';
import { MapComponent } from './map/map.component';


const routes: Routes = [

  { path: 'map', component: MapComponent },
  { path: 'liste', component: ListeComponent },
  { path: 'appartement/:id', component: AppartementComponent },
  // { path: '',   redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
