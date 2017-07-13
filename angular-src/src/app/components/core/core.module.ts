import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { FeatureReelComponent } from './components/feature-reel/feature-reel.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule
    ],
    declarations: [
        FeatureReelComponent,
        BlogpostComponent
    ],
    exports: [],
    providers: []
})

export class CoreModule { }