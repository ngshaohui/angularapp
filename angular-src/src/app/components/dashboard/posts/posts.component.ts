import { Component, OnInit } from '@angular/core';

import Post from '../../core/models/blogpost';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
