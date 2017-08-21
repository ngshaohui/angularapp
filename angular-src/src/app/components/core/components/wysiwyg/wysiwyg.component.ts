// TODO rename to wysiwyg-editor

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/distinctUntilChanged';
import { IdService } from '../../services/id.service';

import { PostService } from '../../services/post.service';

import { Blogpost } from '../../models/blogpost';

// TODO check implementation of constant
const NOT_AUTOSAVED_MESSAGE = "Last autosave: Not yet";

@Component({
  selector: 'wysiwyg-editor',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {
  @Input()
  blogpostId: string;

  blogpost: Blogpost;
  lastAutoSave: string; //should move the last autosave under the blogpost interface

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
    //initialise quill editor
    console.log(this.editor);
    this.editor
      .onContentChanged.debounceTime(800)
      .distinctUntilChanged()
      .subscribe(data => {
        this.autoSave();
        // console.log(data);
      });
    this.editor.modules = this.customQuillToolbar; //load custom toolbar
    this.editor.placeholder = this.placeholderTexts[Math.floor(Math.random() * this.placeholderTexts.length)];

    this.postService.getBlogpost(this.blogpostId)
    .then((blogpost: Blogpost) => {
      this.blogpost = blogpost;

      if (!blogpost.lastAutosaved) {
        // TODO
      }
    })
    .catch((res: any) => {
      // TODO handle error
      console.log(res);
    });

    this.lastAutoSave = "Last autosave: Not yet";
  }

  //publish for unpublished posts (buttons)
  //update for published posts
  publishPost(): void {
    //TODO force save the form

    let currentDate = new Date().toLocaleString('en-US');

    // check if the post has ever been published
    if (!this.blogpost.firstPublished) {
      this.blogpost.firstPublished = currentDate;
    }

    // store/update the date of publish
    this.blogpost.lastUpdated = currentDate;

    this.postService.publishBlogpost(this.blogpost);
  }

  //this should be in a service
  private autoSave(): void {
    let currentDate = new Date().toLocaleString('en-US');
    this.blogpost.lastAutosaved = currentDate; //TODO change lastAutosaved to lastAutosave
  
    this.postService.saveBlogpostDraft(this.blogpost);
    this.lastAutoSave = "Last autosave: " + currentDate;
  }
}
