import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { DashboardRouter } from './dashboard-router';

import { CoreModule } from '../core/core.module';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { OverviewComponent } from './overview/overview.component';
import { MediaComponent } from './media/media.component';

import { PostService } from './post/post.service';
import { PostsService } from './posts/posts.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    DashboardRouter,
    CoreModule
  ],
  declarations: [
    DashboardComponent,
    SidebarComponent,
    PostComponent,
    PostsComponent,
    OverviewComponent,
    MediaComponent
  ],
  exports: [],
  providers: [
    PostService,
    PostsService
  ]
})

export class DashboardModule { }