import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home/home.module';

import { ViewsComponent } from './views.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';

import { ContactService } from './contact/contact.service';

import { ViewsRouter } from './views-router';
import { FooterComponent } from './footer/footer.component';
import { PlannerComponent } from './planner/planner.component';
import { MapComponent } from './planner/map/map.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HomeModule,
        ViewsRouter
    ],
    declarations: [
        ViewsComponent, 
        NavbarComponent, 
        AboutComponent, 
        ContactComponent, 
        ProductsComponent, FooterComponent, PlannerComponent, MapComponent
    ],
    exports: [],
    providers: [ContactService]
})

export class ViewsModule { }