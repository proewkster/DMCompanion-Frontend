import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { HeaderComponent } from 'src/app/main/header/header.component';
import { DTOUpdateUser } from '../models/dto-update-user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public registerForm: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public apiError: boolean;
  constructor(private _authService: AuthenticationService, private _userservice: UserService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // Designate registration form and configure validation
    this.registerForm = this._formBuilder.group({
      nickname: [this._userservice.user.nickname, Validators.maxLength(50)],
      firstName: [this._userservice.user.firstName, [Validators.required, Validators.maxLength(100)]],
      lastName: [this._userservice.user.lastName, [Validators.required, Validators.maxLength(100)]],
      newsletter: [this._userservice.user.newsLetter]
    })
  }
  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && (this.registerForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
  public updateUser = (registerFormValue) => {
    // Initialize properties
    this.errorMessage = '';
    this.apiError = false;
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...registerFormValue };

    // Create instance of registration model
    const user: DTOUpdateUser = {
      id: this._userservice.user.id,
      nickname: formValues.nickname,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      picture: "",
      newsletter: formValues.newsletter,
    }
    this._userservice.updateUser(user)
      .subscribe(
        data => {
          this._userservice.user = data;
          this.router.navigateByUrl('/user/userdetails');
        },
        error => {
          // Handle errors not handled by the HTTP service
          this.handleError(error);
        })
  }
  private handleError = (error: HttpErrorResponse) => {
    // Email address already in use
    if (error.error.message == "User already exists") {
      this.errorMessage = "Email address is already in use";
    }

    // Validation errors
    else if (error.error.title == "One or more validation errors occurred.") {

      // Initialize variable to hold validation errors
      let message = 'One or more validation errors occurred: <br>';

      // Grab all validation errors from the error response
      const values = Object.values(error.error.errors);

      values.map((m: string) => {
        message += '- ' + m + '<br>';
      })

      this.errorMessage = message.slice(0, -4);
    }

    // Any other error
    else {
      this.errorMessage = "An unspecified error occurred";
    }

    // Set apiError to true to display generic alert on page
    this.apiError = true;
  }

}
