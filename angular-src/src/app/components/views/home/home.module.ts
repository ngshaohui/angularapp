import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from '../../core/core.module';

import { HomeComponent } from './home.component';
import { ListPostsComponent } from './list-posts/list-posts.component';

import { ListPostsService } from './list-posts/list-posts.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    ListPostsComponent
  ],
  providers: [
    ListPostsService
  ]
})
export class HomeModule { }
