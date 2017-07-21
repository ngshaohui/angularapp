import { Injectable } from '@angular/core';

import { Blogpost } from '../../../core/models/blogpost';

import { COMPLETED_POSTS } from '../../../core/dummydata/dummy-posts';

@Injectable()
export class ListPostsService {

  constructor() { }

  //simulate API call to server
  getPostsAPI(): Promise<Blogpost[]> {
      return new Promise(resolve => {
        setTimeout(() => resolve(COMPLETED_POSTS), 2000);
      });
  }

  getPostsInstant(): Promise<Blogpost[]> {
      return new Promise(resolve => {
        resolve(COMPLETED_POSTS);
      });
  }

  getPosts(): Promise<Blogpost[]> {
    return this.getPostsAPI(); //stub
  }

}