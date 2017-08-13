import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Blogpost } from '../models/blogpost';

import { COMPLETED_POSTS } from '../dummydata/dummy-posts';

const PostRoutes = {
    delete: "http://localhost:3000/api/posts/delete"
}

@Injectable()
export class CreatePostService {

    constructor(
        private http: Http
    ) { }

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

    //TODO specify the interface of the promise being returned
    deletePost(form): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let credentials = {
            username: form.username,
            password: form.password
        }

        //TODO require token

        return new Promise((resolve, reject) => {
            this.http
                .post(PostRoutes.delete, credentials, { headers: headers })
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

    publishPost() {
        ;
    }

}