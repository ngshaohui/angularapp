import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';

import { ViewsModule } from './components/views/views.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ViewsModule,
    DashboardModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
