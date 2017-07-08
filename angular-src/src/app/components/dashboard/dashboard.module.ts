import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardRouter } from './dashboard-router';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostComponent } from './post/post.component';
import { OverviewComponent } from './overview/overview.component';
import { MediaComponent } from './media/media.component';

@NgModule({
    imports: [CommonModule, DashboardRouter],
    declarations: [DashboardComponent, SidebarComponent, PostComponent, OverviewComponent, MediaComponent],
    exports: [],
    providers: []
})

export class DashboardModule { }