import { Router } from '@angular/router';
import { DTO_ForgotPassword } from './../../models/dto_forgot-password';
import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalSettings } from 'src/app/shared/globalsettings';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public isSubmitted = false;
  public apiError: boolean;
  public apiSuccess: boolean;

  constructor(private _authService: AuthenticationService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Designate input form and validate controls
    this.forgotPasswordForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  // Validation methods
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && (this.forgotPasswordForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName:string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName);
  }

  // Submit form to send email from API
  public forgotPassword = (forgotPasswordFormValue) => {
    // Initialize properties
    this.isSubmitted = true;
    this.apiError = false;
    this.apiSuccess = false;

    // Stop if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // Get form values
    const formValues = {...forgotPasswordFormValue };

    // Create instance of ForgotPassword model
    const data: DTO_ForgotPassword = {
      email: formValues.email,
      clientUri: GlobalSettings['UIServer'] + "/authentication/resetpassword"
    }

    // Send email
    this._authService.forgotPassword(data)
      .subscribe(_ => {
        // Show success message
        this.apiSuccess = true;
      },
      error => {
        // Show generic error
        this.apiError = true;
      })
  }
}
