import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


const AuthRoutes = {
    login: "/auth/login"
}

@Injectable()
export class AuthService {

    constructor(
        private http: Http
    ) { }

    //TODO specify the interface of the promise being returned
    login(form): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let credentials = {
            username: form.username,
            password: form.password
        }

        return new Promise((resolve, reject) => {
            this.http
            .post(AuthRoutes.login, credentials, { headers: headers })
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

}