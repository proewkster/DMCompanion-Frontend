import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/validators/must-match';
import { DtoUpdatePassword } from '../models/dto-update-password';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  public updatePWForm: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public apiError: boolean;
  constructor(private _userservice: UserService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // Designate registration form and configure validation
    this.updatePWForm = this._formBuilder.group({
      oldPassword: [null, [Validators.required, Validators.minLength(8)]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]

    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }
  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.updatePWForm.controls[controlName].invalid && (this.updatePWForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.updatePWForm.controls[controlName].hasError(errorName);
  }
  public updatePassword = (updatePWForm) => {
    // Initialize properties
    this.errorMessage = '';
    this.apiError = false;
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.updatePWForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...updatePWForm };

    // Create instance of registration model
    const password: DtoUpdatePassword = {
      id: this._userservice.user.id,
      oldPassword: formValues.oldPassword,
      newPassword: formValues.newPassword
    }
    this._userservice.updatePassword(password)
      .subscribe(
        data => {
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
