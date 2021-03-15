import { Router } from '@angular/router';
import { GlobalSettings } from './../../../shared/globalsettings';
import { DTO_Register } from './../../models/dto_register';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/must-match';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

public registerForm: FormGroup;
public isSubmitted = false;
public errorMessage: string;
public apiError: boolean;

  constructor(private _authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    // Designate registration form and configure validation
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      nickname: [null, Validators.maxLength(50)],
      firstName: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      newsletter: [false],
      privacyStatement: [false, Validators.requiredTrue]
    },{
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && (this.registerForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  // Registration
  public registerUser = (registerFormValue) => {

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
    const user: DTO_Register = {
      email: formValues.email,
      nickname: formValues.nickname,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
      picture: "",
      newsletter: formValues.newsletter,
      clientUri: GlobalSettings['UIServer'] + "/authentication/confirmemailaddress"
    }

    // Register user in API
    this._authService.registerUser(user)
      .subscribe(_ => {
        this.router.navigateByUrl('authentication/register/success');
      },
      error => {
        console.log(error);

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
