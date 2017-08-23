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
  postId: String;

  constructor(
    private fb: FormBuilder,
    private idService: IdService,
    private postService: PostService,
    private createPostService: CreatePostService
  ) {
  }

  ngOnInit() {
    //create the empty blogpost
    let blogpost = new Blogpost;
    blogpost.id = this.idService.generateUniqueId();
    blogpost.lastAutosave = "Not yet";
    blogpost.created = new Date().toLocaleString('en-US');
    blogpost.isPublished = false;

    this.postService.createBlogpostDraft(blogpost)
    .then(res => {
      this.postId = blogpost.id;
    })
    .catch(res => {
      console.log(res);
    });
    //only create the wysiwyg component when the blogpost has been created in the db
  }

}