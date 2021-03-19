import { ActivatedRoute, Router } from '@angular/router';
import { DTO_ResetPassword } from './../../models/dto_reset-password';
import { MustMatch } from 'src/app/shared/validators/must-match';
import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  public isSubmitted = false;
  public apiError: boolean;
  public apiSuccess: boolean;

  constructor(private _authService: AuthenticationService, private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    // Designate input form and validate controls
    this.resetPasswordForm = this._formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    })

    // Check presence of token, if not present -> redirect to homepage
    const token = this._route.snapshot.queryParams['token'];

    if (!token) {
      this._router.navigate(['/']);
    }
  }

  // Validation methods
  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && (this.resetPasswordForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName);
  }

  // Reset password
  public resetPassword = (resetPasswordFormValue) => {
    // Initialize properties
    this.isSubmitted = true;
    this.apiError = false;
    this.apiSuccess = false;

    // Stop if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    } 

    // Get form values
    const formValues = {... resetPasswordFormValue };

    // Retrieve query parameters from route
    const token = this._route.snapshot.queryParams['token'];
    const userId = this._route.snapshot.queryParams['userId'];

    // Create instance of reset password model
    const data: DTO_ResetPassword = {
      userId: userId,
      token: token,
      password: formValues.password
    }

    // Reset password via API
    this._authService.resetPassword(data)
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
