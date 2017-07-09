import { Component, OnInit } from '@angular/core';

import Post from '../../core/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  lastAutoSave: string;
  postTitle: string;
  editorContent: string;
  placeholderTexts = [
    "The course of true love never did run smooth.",
    "Love looks not with the eyes but with the mind.\n And therefore is winged Cupid painted blind.",
    "O Helena, goddess, nymph, perfect, divine!",
    "Come what come may,\n Time and the hour runs through the roughest day.",
    "Do not go gentle into that good night.\n Rage, rage against the dying of the light.",
    "Two roads diverged in a wood, and I—\n I took the one less traveled by,\n And that has made all the difference.",
    "A horse, a horse, my kingdom for a horse!"
  ]

  constructor() {
    this.lastAutoSave = "Last autosave: Today 12.16pm";
    this.editorContent = "";
  }

  ngOnInit() {
  }

  publishPost(): void {
    //validate form first
  }

}