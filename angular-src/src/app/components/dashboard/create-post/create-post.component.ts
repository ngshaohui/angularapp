import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/distinctUntilChanged';
import { IdService } from '../../core/services/id.service';

import { CreatePostService } from './create-post.service';

import { Blogpost } from '../../core/models/blogpost';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  blogpost: Blogpost;
  postId: string;
  lastAutoSave: string;
  postTitle: string;
  editorContent: string;
  placeholderTexts = [
    "The course of true love never did run smooth.",
    // "Love looks not with the eyes but with the mind.\nAnd therefore is winged Cupid painted blind.",
    "O Helena, goddess, nymph, perfect, divine!",
    // "Come what come may,\nTime and the hour runs through the roughest day.",
    // "Do not go gentle into that good night.\nRage, rage against the dying of the light.",
    // "Two roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.",
    "A horse, a horse, my kingdom for a horse!"
  ]
  //this.placeholderTexts[Math.floor(Math.random() * this.placeholderTexts.length)]
  customQuillToolbar: any;

  constructor(
    private fb: FormBuilder,
    private idService: IdService,
    private createPostService: CreatePostService
  ) {
    this.editorContent = "";
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
    this.editor
      .onContentChanged.debounceTime(800)
      .distinctUntilChanged()
      .subscribe(data => {
        this.autoSave();
      });
    this.editor.modules = this.customQuillToolbar; //load custom toolbar
    this.editor.placeholder = this.placeholderTexts[Math.floor(Math.random() * this.placeholderTexts.length)];

    this.postId = this.idService.generateUniqueId();
    this.lastAutoSave = "Last autosave: Not yet";
  }

  publishPost(): void {
    //validate form first
  }

  //this should be in a service
  private autoSave(): void {
    console.log("autosaved");
    //do api call to server
    let date = this.createPostService.savePost();
    this.lastAutoSave = "Last autosave: " + date;
  }

}