import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ViewsComponent } from './views.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';

import { ContactService } from './services/contact.service';

import { ViewsRouter } from './views-router';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ViewsRouter],
    declarations: [
        ViewsComponent, 
        NavbarComponent, 
        HomeComponent, 
        AboutComponent, 
        ContactComponent, 
        ProductsComponent
    ],
    exports: [],
    providers: [ContactService]
})

export class ViewsModule { }