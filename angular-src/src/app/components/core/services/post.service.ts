// TODO rename to blogposts.service

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../../auth/auth.service';

import { Blogpost } from '../models/blogpost';
import { COMPLETED_POSTS } from '../dummydata/dummy-posts';

const PostRoutes = {
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

    getPost(): Promise<Blogpost> {
        //do api call to server
        return Promise.resolve(COMPLETED_POSTS[0]);
    }

    getPosts(): Promise<Blogpost[]> {
        return Promise.resolve(COMPLETED_POSTS);
    }

    savePost(): string {
        let date = new Date().toLocaleString('en-US');
        return date;
    }

    //TODO specify the interface of the promise being returned
    deletePost(form): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        //TODO require token

        return new Promise((resolve, reject) => {
            this.http
                .post(PostRoutes.delete, { headers: headers })
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

    publishPost(blogpost: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .post(PostRoutes.publish, blogpost, { headers: headers })
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