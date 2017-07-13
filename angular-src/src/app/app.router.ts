import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BlogpostComponent } from './components/core/components/blogpost/blogpost.component';
import { FeatureReelComponent } from './components/core/components/feature-reel/feature-reel.component';

export const appRoutes: Routes = [
  { path: 'blogpost', component: BlogpostComponent },
  { path: 'featurereel', component: FeatureReelComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);