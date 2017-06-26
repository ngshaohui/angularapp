import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: String;
  email: String;
  message: String;
  submitSuccess: Boolean;

  constructor(
    private contactService: ContactService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  userForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    message: new FormControl()
  });

  onFormSubmit() {
    const form = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      message: this.userForm.value.message
    }

    // Submit Form
    this.contactService.sendForm(form).subscribe(data => {
      if (data.success) {
        console.log("Success");
        this.submitSuccess = true;
        this.userForm.reset();
      } else {
        console.log("Something went wrong");
      }
    });
  }
}