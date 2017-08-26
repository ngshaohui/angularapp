// TODO style page

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  isUpdating: boolean;

  constructor(
    private router: Router,
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
    this.isUpdating = false; // disable the delete button before the action has been executed
  }

  editBlogpost(blogpost: Blogpost) {
    // create draft
    // navigate to post-editor component after creation
    this.postService.createBlogpostDraft(blogpost)
    .then(res => {
      this.router.navigate(['/dashboard/post', blogpost.id]);
    })
    .catch(res => {
      // TODO proper error handling
      console.log("unable to create draft");
    });
  }
  
  deleteBlogpost(blogpostId: string) {
    this.postService.deleteBlogpost(blogpostId)
    .then(res => {
      if (res.success) {
        this.loadBlogposts();
        this.loadDeletedDrafts();
      } else {
        // TODO proper error handling
        console.log("unable to delete blogpost");
      }
    })
    .catch(res => {
      console.log("unable to delete blogpost");
    });
  }

  editDraft(blogpostId: string) {
    this.router.navigate(['/dashboard/post', blogpostId]);
  }

  deleteDraft(blogpostId: string) {
    this.postService.moveDraftToDeleted(blogpostId)
    .then(res => {
      if (res.success) {
        this.loadDrafts();
        this.loadDeletedDrafts();
      } else {
        // TODO proper error handling
        console.log("unable to delete blogpost");
      }
    })
    .catch(res => {
      console.log("unable to delete blogpost");
    });
  }

  deleteDeletedDraft(blogpostId: string) {
    this.postService.deleteDeletedDraft(blogpostId)
    .then(res => {
      if (res.success) {
        this.loadBlogposts();
        this.loadDrafts();
        this.loadDeletedDrafts();
      } else {
        // TODO proper error handling
        console.log("unable to delete blogpost");
      }
    })
    .catch(res => {
      console.log("unable to delete blogpost");
    });
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
    this.postService.getDeletedDrafts()
    .then(((blogposts: Blogpost[])=> {
      this.deletedDrafts = blogposts;
    }))
    .catch(res => {
      console.log("error getting list of deletedDrafts");
      console.log(res);
    });
  }

}
