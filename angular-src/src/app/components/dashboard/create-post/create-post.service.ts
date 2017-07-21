import { Injectable } from '@angular/core';

import { Blogpost } from '../../core/models/blogpost';

import { COMPLETED_POSTS } from '../../core/dummydata/dummy-posts';

@Injectable()
export class CreatePostService {

  constructor() { }

  getPost(): Promise<Blogpost> {
    //do api call to server
    return Promise.resolve(COMPLETED_POSTS[0]);
  }

  getPosts(): Promise<Blogpost[]> {
      return Promise.resolve(COMPLETED_POSTS);
  }

  savePost(): string {
      return new Date().toLocaleString('en-US');
  }

  publishPost() {
    ;
  }

}