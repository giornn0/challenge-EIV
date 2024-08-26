import { Routes } from '@angular/router';
import { SellersFormComponent, SellersListComponent } from './pages';

export default [
  { path: '', component: SellersListComponent },
  { path: 'nuevo', component: SellersFormComponent },
  { path: 'editar/:id', component: SellersFormComponent },
] satisfies Routes;
