import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {
  private mailUrl = '/mail';

  constructor(
    private http: Http
  ) { }

  sendForm(form) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.mailUrl, form,
      { headers: headers }).map(res => res.json());
  }

}
