// TODO style page

import { Component, OnInit } from '@angular/core';

import { PostService } from '../../core/services/post.service';

import { Blogpost } from '../../core/models/blogpost';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  blogposts: Blogpost[];
  drafts: Blogpost[];
  deletedDrafts: Blogpost[];
  activeTab: string;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.activeTab = "blogposts";
    // TODO need to account for when there are no posts at all
    // since loading will continue perpetually
    // could set a flag for each
    this.loadBlogposts();
    this.loadDrafts();
    this.loadDeletedDrafts();
  }

  deletePost() {
    //check if post has been published (go to published post db)
    //check if post is a draft
  }

  changeTab(type: string): void {
    this.activeTab = type;
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
    console.log('loading drafts');
    this.postService.getBlogpostDrafts()
    .then(((drafts: Blogpost[])=> {
      this.drafts = drafts;
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
