import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


const AuthRoutes = {
    login: "/login"
}

@Injectable()
export class PostsService {

    constructor(
        private http: Http
    ) { }

    //   //simulate API call to server
    //   getPostsAPI(): Promise<Blogpost[]> {
    //       return new Promise(resolve => {
    //         setTimeout(() => resolve(COMPLETED_POSTS), 2000);
    //       });
    //   }

    //   getPostsInstant(): Promise<Blogpost[]> {
    //       return new Promise(resolve => {
    //         resolve(COMPLETED_POSTS);
    //       });
    //   }

    //   getPosts(): Promise<Blogpost[]> {
    //     return this.getPostsAPI(); //stub
    //   }

    sendForm(form) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(AuthRoutes.login, form,
            { headers: headers }).map(res => res.json());
    }

}