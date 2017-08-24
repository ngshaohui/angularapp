import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';
import { PostService } from '../../core/services/post.service';

import { Blogpost } from '../../core/models/blogpost';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Blogpost[];
  blogposts: Blogpost[];
  drafts: Blogpost[];
  deletedDrafts: Blogpost[];

  constructor(
    private postService: PostService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    // TODO need to account for when there are no posts at all (loading will continue perpetually)
    this.loadBlogposts();
    this.loadDrafts();
    this.loadDeletedDrafts();
  }

  private loadBlogposts(): void {
    this.postService.getBlogposts()
    .then(((blogposts: Blogpost[])=> {
      this.blogposts = blogposts;
    }))
    .catch(res => {
      console.log("error getting list of blogposts");
      console.log(res);
    });
  }

  private loadDrafts(): void {
    this.postService.getBlogpostDrafts()
    .then(((blogposts: Blogpost[])=> {
      this.drafts = blogposts;
    }))
    .catch(res => {
      console.log("error getting list of drafts");
      console.log(res);
    });
  }

  private loadDeletedDrafts(): void {
    this.postService.getBlogposts()
    .then(((blogposts: Blogpost[])=> {
      this.deletedDrafts = blogposts;
    }))
    .catch(res => {
      console.log("error getting list of deletedDrafts");
      console.log(res);
    });
  }

}
