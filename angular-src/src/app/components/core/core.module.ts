import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { FeatureReelComponent } from './components/feature-reel/feature-reel.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';

import { IdService } from './services/id.service';

import { SafeHtmlPipe } from './pipes/sanitize-html.pipe';

// Loading spinners
import { BouncingLoaderComponent } from './components/loading/bouncing-loader/bouncing-loader.component';
import { FadingSpinnerComponent } from './components/loading/fading-spinner/fading-spinner.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule
    ],
    declarations: [
        SafeHtmlPipe,
        FeatureReelComponent,
        BlogpostComponent,
        BouncingLoaderComponent,
        FadingSpinnerComponent
    ],
    exports: [
        BlogpostComponent,
        BouncingLoaderComponent,
        FadingSpinnerComponent
    ],
    providers: [
        IdService
    ]
})

export class CoreModule { }