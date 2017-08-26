import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { DashboardRouter } from './dashboard-router';

import { CoreModule } from '../core/core.module';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostsComponent } from './posts/posts.component';
import { OverviewComponent } from './overview/overview.component';
import { MediaComponent } from './media/media.component';

import { AuthGuard } from '../../guards/auth.guard';

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
    PostEditorComponent,
    PostsComponent,
    OverviewComponent,
    MediaComponent
  ],
  exports: [],
  providers: [
    AuthGuard
  ]
})

export class DashboardModule { }