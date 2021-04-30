import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalSettings } from 'src/app/shared/globalsettings';
import { DtoUpdateEmail } from '../models/dto-update-email';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editemail',
  templateUrl: './editemail.component.html',
  styleUrls: ['./editemail.component.scss']
})
export class EditemailComponent implements OnInit {
  public updateMailForm: FormGroup;
  public isSubmitted = false;
  public errorMessage: string;
  public apiError: boolean;
  constructor(private _userservice: UserService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.updateMailForm = this._formBuilder.group({
      oldEmail: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      newEmail: [null, [Validators.required, Validators.email, Validators.maxLength(100)]]
    })
  }
  public validateControl = (controlName: string) => {
    return this.updateMailForm.controls[controlName].invalid && (this.updateMailForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.updateMailForm.controls[controlName].hasError(errorName);
  }

  // Registration
  public updatePassword = (updateMailForm) => {

    // Initialize properties
    this.errorMessage = '';
    this.apiError = false;
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.updateMailForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...updateMailForm };

    // Create instance of registration model
    const mail: DtoUpdateEmail = {
      id: this._userservice.user.id,
      oldEmail: formValues.oldEmail,
      newEmail: formValues.newEmail,
      clientUri: GlobalSettings['UIServer'] + "/authentication/confirmemailaddress"
    }

    // Register user in API
    this._userservice.updateEmail(mail)
      .subscribe(_ => {
        this.router.navigateByUrl('authentication/register/success');
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
