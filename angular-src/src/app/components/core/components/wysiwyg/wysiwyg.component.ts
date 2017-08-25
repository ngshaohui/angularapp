/* 
 * TODO 
 * rename to wysiwyg-editor
 * add autosave to title
 */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/distinctUntilChanged';

import { IdService } from '../../services/id.service';
import { PostService } from '../../services/post.service';

import { Blogpost } from '../../models/blogpost';

@Component({
  selector: 'wysiwyg-editor',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {
  @Input()
  blogpostId: string;

  blogpost: Blogpost;
  lastAutosave: string;

  // Quill editor
  form: FormGroup;
  placeholderTexts = [
    "The course of true love never did run smooth.",
    // "Love looks not with the eyes but with the mind.\nAnd therefore is winged Cupid painted blind.",
    "O Helena, goddess, nymph, perfect, divine!",
    // "Come what come may,\nTime and the hour runs through the roughest day.",
    // "Do not go gentle into that good night.\nRage, rage against the dying of the light.",
    // "Two roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.",
    "A horse, a horse, my kingdom for a horse!"
  ];
  customQuillToolbar: any;

  constructor(
    private fb: FormBuilder,
    private idService: IdService,
    private postService: PostService,
    private router: Router
  ) {
    this.form = fb.group({
      editor: []
    });
    this.customQuillToolbar = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

        ['code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

        ['clean'],                                         // remove formatting button

        ['link', 'image']                         // link and image, video
      ]
    };
  }
  @ViewChild('editor') editor: QuillEditorComponent

  ngOnInit() {
    this.initializeQuill();
    // TODO refactor the following to its own function
    this.postService.getBlogpostDraft(this.blogpostId)
    .then((blogpost: Blogpost) => {
      console.log(blogpost);
      this.blogpost = blogpost;
      this.lastAutosave = blogpost.lastAutosave;
    })
    .catch((res: any) => {
      // TODO handle error
      console.log(res);
    });
  }

  // Initialise quill editor
  private initializeQuill(): void {
    this.editor
    .onContentChanged.debounceTime(800)
    .distinctUntilChanged()
    .subscribe(data => {
      this.autoSave();
    });
    this.editor.modules = this.customQuillToolbar; //load custom toolbar
    this.editor.placeholder = this.placeholderTexts[Math.floor(Math.random() * this.placeholderTexts.length)];
  }

  //publish for unpublished posts (buttons)
  //update for published posts
  publishBlogpost(): void {
    //TODO force save the draft
    this.autoSave()
    .then(res => {
      if (res.success) {
        ;
      }
      let currentDate = new Date().toLocaleString('en-US');

      // check if the post has ever been published
      if (!this.blogpost.firstPublished) {
        this.blogpost.firstPublished = currentDate;
      }

      // store/update the date of publish
      this.blogpost.lastUpdated = currentDate;

      this.postService.publishBlogpost(this.blogpost)
      .then(res => {
        if (res.success) {
          this.router.navigate(['/dashboard/posts']);
        } else {
          // TODO error handling
          console.log("unable to publish the blogpost draft");
        }
      })
      .catch(res => {
        // TODO proper error handling
        console.log("an error occured while publishing the post");
      });
    })
    .catch(res => {
      // TODO proper error handling
      console.log("unable to save before publishing");
      console.log(res);
    });
  }

  // TODO have a confirmation modal before deleting post
  // have a db for storing the deleted posts
  deleteDraft(): void {
    this.postService.deleteDraft(this.blogpost.id)
    .then(res => {
      if (res.success) {
        this.router.navigate(['/dashboard/posts']);
      } else {
        // TODO proper error handling
        console.log("encountered error while deleting blogpost");
      }
    })
    .catch(res => {
      console.log("error deleting blogpost");
      console.log(res);
    })
  }

  //this should be in a service
  private autoSave(): Promise<any> {
    this.blogpost.content = this.form.controls.editor.value;
  
    return new Promise((resolve, reject) => {
      this.blogpost.lastAutosave = new Date().toLocaleString('en-US');
      this.postService.updateBlogpostDraft(this.blogpost)
      .then(res => {
        // TODO resolve error, lastAutosave
        this.lastAutosave = new Date().toLocaleString('en-US');
        resolve({success: true});
      })
      .catch(res => {
        console.log("unable to autosave");
        reject({success: false});
      });
    });
  }
}
