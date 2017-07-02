import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { ContactService } from './services/contact.service';

import { ViewsRouter } from './views-router';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ViewsRouter],
    declarations: [HomeComponent, AboutComponent, ContactComponent],
    exports: [],
    providers: [ContactService]
})

export class ViewsModule { }