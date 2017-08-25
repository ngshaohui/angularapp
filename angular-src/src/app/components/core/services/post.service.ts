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
// TODO just have 3 routes since they are largely repeated
const BlogpostRoutes = {
    blogpost: "http://localhost:3000/api/posts",
    draft: "http://localhost:3000/api/drafts",
    deleted: "http://localhost:3000/api/trash"
}

@Injectable()
export class PostService {

    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    // DRAFTS

    // CREATE draft
    createBlogpostDraft(blogpost: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());
        
        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.draft, blogpost, { headers: headers })
                .subscribe(
                data => {
                    resolve({success: true});
                },
                err => {
                    reject({success: false});
                });
        });
    }

    // GET all drafts
    getBlogpostDrafts(): Promise<Blogpost[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.draft, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
                        let drafts = [];
                        let results = res.json();
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
                                isPublished: result.is_published
                            } as Blogpost)
                        }
                        resolve(drafts);
                    } else {
                        reject({success: false});
                    }
                },
                err => {
                    reject(err);
                });
        });
    }

    // GET draft
    getBlogpostDraft(draftId: string): Promise<Blogpost> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.draft + "/" + draftId, { headers: headers })
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
                            isPublished: result.is_published
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

    // UPDATE draft
    updateBlogpostDraft(blogpost: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());
        console.log("saving the following entity");
        console.log(blogpost);
        
        return new Promise((resolve, reject) => {
            this.http
                .patch(BlogpostRoutes.draft + '/' + blogpost.id, blogpost, { headers: headers })
                .subscribe(
                data => {
                    resolve({success: true});
                },
                err => {
                    reject({success: false});
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
                .delete(BlogpostRoutes.draft + '/' + draftId, { headers: headers })
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
    
    // CREATE blogpost
    createBlogpost(postId: string): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.blogpost + "/" + postId, { headers: headers })
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

    // GET all blogposts
    getBlogposts(): Promise<Blogpost[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.blogpost, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
                        let blogposts = [];
                        let results = res.json();
                        for (let result of results) {
                            blogposts.push({
                                id: result._id,
                                title: result.title,
                                content: result.content,
                                created: result.created,
                                firstPublished: result.first_published,
                                lastUpdated: result.last_updated,
                                lastAutosave: result.last_autosave,
                                tags: result.tags,
                                isPublished: result.is_published
                            } as Blogpost)
                        }
                        resolve(blogposts);
                    } else {
                        reject({success: false});
                    }
                },
                err => {
                    reject(err);
                });
        });
    }

    // GET blogpost
    getBlogpost(postId: string): Promise<Blogpost> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.blogpost + "/" + postId, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
                        resolve(res.json());
                    } else {
                        reject({success: false});
                    }
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
                .post(BlogpostRoutes.blogpost + '/' + blogpostId, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
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
                .post(BlogpostRoutes.blogpost, blogpost, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
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
    
    // deletedDrafts DB

    // CREATE deleted
    createDeletedDraft(deletedDraft: Blogpost): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());
        
        return new Promise((resolve, reject) => {
            this.http
                .post(BlogpostRoutes.deleted, deletedDraft, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
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

    // GET all deleted
    getDeletedDrafts(): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.deleted, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
                        let deletedDrafts = [];
                        let results = res.json();
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
                                isPublished: result.is_published
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
    
    // GET deleted
    getDeletedDraft(draftId: string): Promise<Blogpost> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .get(BlogpostRoutes.deleted + "/" + draftId, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
                        let result = res.json();
                        resolve({
                            id: result._id,
                            title: result.title,
                            content: result.content,
                            created: result.created,
                            firstPublished: result.first_published,
                            lastUpdated: result.last_updated,
                            lastAutosave: result.last_autosave,
                            tags: result.tags,
                            isPublished: result.is_published
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

    // DELETE deleted
    deleteDeletedDraft(draftId: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getToken());

        return new Promise((resolve, reject) => {
            this.http
                .delete(BlogpostRoutes.deleted + '/' + draftId, { headers: headers })
                .subscribe(
                res => {
                    if (res.status === 200) {
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

    // Helper functions

    restoreDeletedDraft(draftId: string): Promise<any> {
        //delete from deleted db
        //create in draft db
        return new Promise((resolve, reject) => {
            this.getDeletedDraft(draftId) // get deleted draft
            .then((draft: Blogpost) => {
                this.createBlogpostDraft(draft) // create draft
                .then(res => {
                    if (res.success) {
                        this.deleteDeletedDraft(draftId) // remove from deleted drafts
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

    publishBlogpost(blogpost: Blogpost): Promise<any> {
        //publish draft
        return new Promise((resolve, reject) => {
            this.publishDraft(blogpost)
            .then(res => {
                if (res.success) {
                    // delete draft
                    this.deleteDraft(blogpost.id)
                    .then(res => {
                        if (res.success) {
                            resolve({success: true});
                        } else {
                            reject({success: false});
                        }
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

}