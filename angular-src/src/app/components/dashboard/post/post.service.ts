import { Injectable } from '@angular/core';

import { Blogpost } from '../../core/models/blogpost';

import { POSTS } from '../../core/dummydata/dummy-posts';

@Injectable()
export class PostService {

  constructor() { }

  getPost(): Promise<Blogpost> {
    //do api call to server
    return Promise.resolve(POSTS[0]);
  }

  getPosts(): Promise<Blogpost[]> {
      return Promise.resolve(POSTS);
  }

  savePost(): string {
      return new Date().toLocaleString('en-US');
  }

}