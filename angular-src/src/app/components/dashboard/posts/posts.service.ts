import { Injectable } from '@angular/core';

import Blogpost from '../../core/models/blogpost';

import { POSTS } from '../../core/dummydata/dummy-posts';

@Injectable()
export class PostsService {

  constructor() { }

  //simulate API call to server
  getPostsAPI(): Promise<Blogpost[]> {
      return new Promise(resolve => {
        setTimeout(() => resolve(POSTS), 2000);
      });
  }

  getPosts(): Promise<Blogpost[]> {
    return this.getPostsAPI(); //stub
  }

}