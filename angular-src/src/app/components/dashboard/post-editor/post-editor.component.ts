import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { IdService } from '../../core/services/id.service';
import { PostService } from '../../core/services/post.service';

import { Blogpost } from '../../core/models/blogpost';

@Component({
  selector: 'post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  postId: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private idService: IdService,
    private postService: PostService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    });
    if (!this.postId) { //if no route parameters were passed
      this.createNewBlogpost();
    }
  }

  private createNewBlogpost(): void {
    //create the empty blogpost
    let blogpost = new Blogpost;
    blogpost.id = this.idService.generateUniqueId();
    blogpost.lastAutosave = "Not yet";
    blogpost.created = new Date().toLocaleString('en-US');
    blogpost.isPublished = false;

    this.postService.createBlogpostDraft(blogpost)
    .then(res => {
      if (res.success) {
        this.postId = blogpost.id;
      } else {
        // TODO proper error handling
        console.log("Something went wrong when creating the blogpost draft");
      }
    })
    .catch(res => {
      console.log(res);
    });
  }

}