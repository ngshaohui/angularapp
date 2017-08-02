import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any;
  formHasError: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = {};
    this.formHasError = false;
  }

  submitForm() {
    this.authService.login(this.form)
    .then((res) => {
      if (res.success) {
        let token = res.token;
        localStorage.setItem('id_token', token)
        this.authService.storeUserData(token);
        this.router.navigate(['/dashboard']);
      } else {
        this.formHasError = true;
      }
    })
    .catch((res) => {
      console.log(res);
      //TODO check error code and handle error accordingly
    });
  }

}
