import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { FeatureReelComponent } from './components/feature-reel/feature-reel.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';

import { IdService } from './services/id.service';
import { PostService } from './services/post.service';

import { SafeHtmlPipe } from './pipes/sanitize-html.pipe';

// Loading spinners
import { BouncingLoaderComponent } from './components/loading/bouncing-loader/bouncing-loader.component';
import { FadingSpinnerComponent } from './components/loading/fading-spinner/fading-spinner.component';
import { CondensedBlogpostComponent } from './components/condensed-blogpost/condensed-blogpost.component';
import { WysiwygComponent } from './components/wysiwyg/wysiwyg.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule
    ],
    declarations: [
        SafeHtmlPipe,
        FeatureReelComponent,
        BlogpostComponent,
        BouncingLoaderComponent,
        FadingSpinnerComponent,
        CondensedBlogpostComponent,
        WysiwygComponent
    ],
    exports: [
        BlogpostComponent,
        BouncingLoaderComponent,
        FadingSpinnerComponent,
        WysiwygComponent
    ],
    providers: [
        IdService,
        PostService
    ]
})

export class CoreModule { }