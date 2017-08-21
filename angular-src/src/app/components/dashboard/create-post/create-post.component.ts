import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/distinctUntilChanged';
import { IdService } from '../../core/services/id.service';

import { PostService } from '../../core/services/post.service';
import { CreatePostService } from './create-post.service';

import { Blogpost } from '../../core/models/blogpost';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postId: string;

  constructor(
    private fb: FormBuilder,
    private idService: IdService,
    private postService: PostService,
    private createPostService: CreatePostService
  ) {
  }

  ngOnInit() {
    this.postId = this.idService.generateUniqueId();
  }

}