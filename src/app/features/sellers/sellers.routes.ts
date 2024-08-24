import { Routes } from '@angular/router';
import { SellersFormComponent, SellersListComponent } from './pages';

export default [
  { path: '', component: SellersListComponent },
  { path: 'new', component: SellersFormComponent },
  { path: 'edit/:id', component: SellersFormComponent },
] satisfies Routes;
