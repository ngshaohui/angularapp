import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// import { ViewsRouter } from './views-router';

@NgModule({
    imports: [CommonModule],
    declarations: [DashboardComponent, SidebarComponent],
    exports: [],
    providers: []
})

export class DashboardModule { }