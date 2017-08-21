// TODO rename to blogposts.service

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../../auth/auth.service';

import { Blogpost } from '../models/blogpost';
import { COMPLETED_POSTS } from '../dummydata/dummy-posts';

const BlogpostRoutes = {
    get: "http://localhost:3000/api/posts",
    save: "http://localhost:3000/api/posts",
    publish: "http://localhost:3000/api/posts",
    delete: "http://localhost:3000/api/posts/delete"
}

@Injectable()
export class PostService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    getBlogpost(postId: string): Promise<Blogpost> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        //TODO require token

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.get + "/" + postId, { headers: headers })
                .subscribe(
                data => {
                    resolve(data.json());
                },
                err => {
                    reject(err);
                }
                );
        });
    }

    getBlogposts(): Promise<Blogpost[]> {
        return Promise.resolve(COMPLETED_POSTS);
    }

    // Save draft of post
    saveBlogpostDraft(blogpost: Blogpost) {
    }

    //TODO specify the interface of the promise being returned
    deleteBlogpost(form): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        //TODO require token

        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.delete, { headers: headers })
                .subscribe(
                data => {
                    resolve(data.json());
                },
                err => {
                    reject(err);
                }
                );
        });
    }

    // TODO when publishing, check if post has already been published
    // if so, should be doing an update
    publishBlogpost(blogpost: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.publish, blogpost, { headers: headers })
                .subscribe(
                data => {
                    if (data.status === 400) {
                        reject({success: false});
                    } else {
                        resolve({success: true});
                    }
                },
                err => {
                    reject({success: false});
                }
                );
        });
    }

}