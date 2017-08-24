// TODO rename to blogposts.service
// TODO rename
// blogpost
// draft
// deleted
// TODO deleted should be for both published blogposts and drafts

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../../auth/auth.service';

import { Blogpost } from '../models/blogpost';
import { COMPLETED_POSTS } from '../dummydata/dummy-posts';

// TODO reorder this in a sensible manner
const BlogpostRoutes = {
    get: "http://localhost:3000/api/posts",
    create: "http://localhost:3000/api/posts",
    save: "http://localhost:3000/api/posts",
    delete: "http://localhost:3000/api/posts",
    getDraft: "http://localhost:3000/api/drafts",
    getDrafts: "http://localhost:3000/api/drafts",
    createDraft: "http://localhost:3000/api/drafts",
    saveDraft: "http://localhost:3000/api/drafts",
    deleteDraft: "http://localhost:3000/api/drafts",
    publishDraft: "http://localhost:3000/api/posts",
    createDeletedDraft: "http://localhost:3000/api/trash",
    getDeletedDraft: "http://localhost:3000/api/trash",
    deleteDeletedDraft: "http://localhost:3000/api/trash",
}

@Injectable()
export class PostService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

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

    getBlogpostDrafts(): Promise<Blogpost[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.getDraft, { headers: headers })
                .subscribe(
                data => {
                    let drafts = [];
                    let results = data.json();
                    for (let result of results) {
                        drafts.push({
                            id: result._id,
                            title: result.title,
                            content: result.content,
                            created: result.created,
                            firstPublished: result.first_published,
                            lastUpdated: result.last_updated,
                            lastAutosave: result.last_autosave,
                            tags: result.tags,
                        } as Blogpost)
                    }
                    resolve(drafts);
                },
                err => {
                    reject(err);
                });
        });
    }
    
    getBlogpostDraft(draftId: string): Promise<Blogpost> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.getDraft + "/" + draftId, { headers: headers })
                .subscribe(
                data => {
                    if (data.status === 200) {
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
                    } else {
                        reject({success: false})
                    }
                },
                err => {
                    reject(err);
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
    
    // TODO return type
    createBlogpost(postId: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.get + "/" + postId, { headers: headers })
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

    getBlogpost(postId: string): Promise<Blogpost> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.get + "/" + postId, { headers: headers })
                .subscribe(
                data => {
                    if (data.status === 200) {
                        resolve(data.json());
                    } else {
                        // TODO find out how to handle error properly here
                        reject({success: false});
                    }
                },
                err => {
                    reject({success: false});
                });
        });
    }

    // TODO change this
    getBlogposts(): Promise<Blogpost[]> {
        return Promise.resolve(COMPLETED_POSTS);
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
    // TODO should not actually delete the draft, just store it in a separate DB
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

    // TODO should call remove draft and publish draft
    publishBlogpost(blogpost: Blogpost): Promise<any> {
        //publish draft
        return new Promise((resolve, reject) => {
            this.publishDraft(blogpost)
            .then(res => {
                if (res.success) {
                    // delete draft
                    this.deleteDraft(blogpost.id)
                    .then(res => {
                        resolve({success: true});
                    })
                    .catch(res => {
                        reject({success: false});
                    });
                } else {
                    reject({success: false});
                }
            })
            .catch(res => {
                reject({success: false});
            })
        });
    }

    moveDraftToDeleted(draftId: string) {
        //create deleted draft
        //remove from drafts
        return new Promise((resolve, reject) => {
            this.getBlogpostDraft(draftId) // get draft
            .then((draft: Blogpost) => {
                this.createDeletedDraft(draft) // create deleted draft
                .then(res => {
                    if (res.success) {
                        this.deleteDraft(draftId) // remove from drafts
                        .then(res => {
                            resolve({success: true});
                        })
                        .catch(res => {
                            reject({success: false});
                        });
                    } else {
                        reject({success: false});
                    }
                })
                .catch(res => {
                    reject({success: false});
                })
            })
            .catch(res => {
                reject({success: false});
            })
        });
    }
    
    // deletedDrafts DB

    createDeletedDraft(deletedDraft: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());
        
        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.createDeletedDraft, deletedDraft, { headers: headers })
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

    getDeletedDrafts(): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.getDeletedDraft, { headers: headers })
                .subscribe(
                data => {
                    if (data.status === 200) {
                        let deletedDrafts = [];
                        let results = data.json();
                        for (let result of results) {
                            deletedDrafts.push({
                                id: result._id,
                                title: result.title,
                                content: result.content,
                                created: result.created,
                                firstPublished: result.first_published,
                                lastUpdated: result.last_updated,
                                lastAutosave: result.last_autosave,
                                tags: result.tags,
                            } as Blogpost)
                        }
                        resolve(deletedDrafts);
                    } else {
                        reject({success: false});
                    }
                },
                err => {
                    reject({success: false});
                });
        });
    }

    deleteDeletedDraft(draftId: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .delete(BlogpostRoutes.deleteDeletedDraft + '/' + draftId, { headers: headers })
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

    restoreDeletedDraft() {
        //delete from deleted db
        //create in draft db
    }

}