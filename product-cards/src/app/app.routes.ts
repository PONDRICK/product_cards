import { Routes } from '@angular/router';
import { ProductCardComponent } from './components/product-card.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductCardComponent,
  },
  { path: '**', redirectTo: '' },
];
