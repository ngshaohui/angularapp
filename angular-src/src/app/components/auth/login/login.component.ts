import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: Object;
  formHasError: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = {};
    this.formHasError = false;
  }

  submitForm() {
    this.authService.login(this.form)
    .then((res) => {
      console.log(res);
      //TODO check login status
      //if fail, set formHasError boolean
      //else if success save jsonwebtoken and redirect user to dashboard
    })
    .catch((res) => {
      console.log(res);
      //TODO check error code and handle error accordingly
    });
  }

}
