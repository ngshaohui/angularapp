import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsComponent } from './posts/posts.component';
import { OverviewComponent } from './overview/overview.component';
import { MediaComponent } from './media/media.component';

const viewsRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: OverviewComponent },
            { path: 'post', component: CreatePostComponent },
            { path: 'posts', component: PostsComponent },
            { path: 'media', component: MediaComponent }
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

export class DashboardRouter { }