import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'dashboard', component: DashboardComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);