import { Routes } from '@angular/router';
import { HomeComponent, NotFoundComponent } from '@core';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'vendedores',
    loadChildren: () => import('./features/sellers/sellers.routes'),
  },
  {
    path: 'localidades',
    loadChildren: () => import('./features/locations/locations.routes'),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
