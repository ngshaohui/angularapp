import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';

const viewsRoutes: Routes = [
    {
        path: '',
        component: ViewsComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'products', component: ProductsComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(viewsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ViewsRouter { }