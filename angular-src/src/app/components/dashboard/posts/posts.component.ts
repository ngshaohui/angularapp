import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';

import Blogpost from '../../core/models/blogpost';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Blogpost[];

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.postsService.getPosts()
    .then((posts: Blogpost[]) => {
      this.posts = posts;
      console.log(this.posts);
    })
  }

}
