import { Component, OnInit } from '@angular/core';

import { ListPostsService } from './list-posts.service';

import { Blogpost } from '../../../core/models/blogpost';

@Component({
  selector: 'list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  posts: Blogpost[];

  constructor(
    private listPostsService: ListPostsService
  ) { }

  ngOnInit() {
    this.listPostsService.getPosts()
    .then((posts: Blogpost[]) => {
      this.posts = posts;
    })
  }

}
