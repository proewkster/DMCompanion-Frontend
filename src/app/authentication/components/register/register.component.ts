import { GlobalSettings } from './../../../shared/globalsettings';
import { DTO_Register } from './../../models/dto_register';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/must-match';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

public registerForm: FormGroup;
public isSubmitted = false;

  constructor(private _authService: AuthenticationService, private formBuilder: FormBuilder) { }

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
    return this.registerForm.controls[controlName].invalid && this.isSubmitted;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  // Registration
  public registerUser = (registerFormValue) => {

    // Set form as submitted
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
      clientUri: GlobalSettings['UIServer'] + "/authentication/ConfirmEmailAddress"
    }

    // Register user in API
    this._authService.registerUser(user)
      .subscribe(data => {
        console.log(data);
      },
      error => {
        console.log(error.error);
      })
  }

}
