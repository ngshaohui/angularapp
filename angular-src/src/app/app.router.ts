import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '**', component: PageNotFoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);