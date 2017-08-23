// TODO rename to blogposts.service

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../../auth/auth.service';

import { Blogpost } from '../models/blogpost';
import { COMPLETED_POSTS } from '../dummydata/dummy-posts';

const BlogpostRoutes = {
    get: "http://localhost:3000/api/posts",
    create: "http://localhost:3000/api/posts",
    save: "http://localhost:3000/api/posts",
    delete: "http://localhost:3000/api/posts",
    getDraft: "http://localhost:3000/api/drafts",
    createDraft: "http://localhost:3000/api/drafts",
    saveDraft: "http://localhost:3000/api/drafts",
    deleteDraft: "http://localhost:3000/api/drafts",
    publishDraft: "http://localhost:3000/api/posts"
}

@Injectable()
export class PostService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    // TODO return type
    createBlogpost(postId: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        //if 200, means success
        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.get + "/" + postId, { headers: headers })
                .subscribe(
                data => {
                    resolve(data.json());
                },
                err => {
                    reject(err);
                });
        });
    }

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
                });
        });
    }

    getBlogposts(): Promise<Blogpost[]> {
        return Promise.resolve(COMPLETED_POSTS);
    }

    // CREATE draft of post
    createBlogpostDraft(blogpost: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());
        
        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.saveDraft, blogpost, { headers: headers })
                .subscribe(
                data => {
                    resolve({success: true});
                },
                err => {
                    reject({success: false});
                });
        });
    }

    // Save draft of post
    saveBlogpostDraft(blogpost: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());
        console.log("saving the following entity");
        console.log(blogpost);
        
        return new Promise((resolve, reject) => {
            this.http
                .patch(BlogpostRoutes.saveDraft + '/' + blogpost.id, blogpost, { headers: headers })
                .subscribe(
                data => {
                    resolve({success: true});
                },
                err => {
                    reject({success: false});
                });
        });
    }

    getBlogpostDraft(postId: string): Promise<Blogpost> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        //TODO require token

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.getDraft + "/" + postId, { headers: headers })
                .subscribe(
                data => {
                    let result = data.json();
                    resolve({
                        id: result._id,
                        title: result.title,
                        content: result.content,
                        created: result.created,
                        firstPublished: result.first_published,
                        lastUpdated: result.last_updated,
                        lastAutosave: result.last_autosave,
                        tags: result.tags,
                    } as Blogpost);
                },
                err => {
                    reject(err);
                });
        });
    }

    // DELETE blogpost
    deleteBlogpost(blogpostId): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.delete + '/' + blogpostId, { headers: headers })
                .subscribe(
                data => {
                    if (data.status === 200) {
                        resolve({success: true});
                    } else {
                        reject({success: false});
                    }
                },
                err => {
                    reject(err);
                });
        });
    }

    // DELETE draft
    deleteDraft(draftId: string): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .delete(BlogpostRoutes.deleteDraft + '/' + draftId, { headers: headers })
                .subscribe(
                data => {
                    if (data.status === 200) {
                        resolve({success: true});
                    } else {
                        reject({success: false});
                    }
                },
                err => {
                    reject({success: false});
                });
        });
    }

    // TODO when publishing, check if post has already been published
    // if so, should be doing an update
    // SHOULD DO THIS AS A HELPER FUNCTION
    publishDraft(blogpost: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.publishDraft, blogpost, { headers: headers })
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
                });
        });
    }

}