import { DTO_Login } from './../../models/dto_login';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() displayAsMenu = false; // Property used to allow calling component to transform the login screen as a menu item

  public loginForm: FormGroup;
  private _returnUrl: string;
  public isSubmitted = false;
  public apiError: boolean;

  constructor(private _authService: AuthenticationService, private _formBuilder: FormBuilder, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    // Designate login form and configure validation
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })

    // Grab return URL from query parameter, or set as homepage if non-existent
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && (this.loginForm.controls[controlName].touched || this.isSubmitted);
  }

  public validateControlForMenu = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.isSubmitted;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  // Login
  public login = (loginFormValue) => {

    // Initialize properties
    this.apiError = false;
    this.isSubmitted = true;

    // Stop if form is invalid
    if(this.loginForm.invalid) {
      return;
    }

    // Get form values
    const formValues = {... loginFormValue };

    // Create instance of login model
    const login: DTO_Login = {
      username: formValues.username,
      password: formValues.password
    }

    // Login user
    this._authService.login(login)
      .subscribe(data => {

        // Store token in local storage
        localStorage.setItem("token", data.token);

        // Set authenticated state
        this._authService.sendAuthenticationChangeNotification(true);
        
        // Redirect to return URL -- Only when displayed as page
        if (!this.displayAsMenu) {
          this._router.navigate([this._returnUrl]);
        }
      },
      error => {
        // Show generic error
        this.apiError = true;
      })
  }

  // Set onclick event for login button in navigation bar menu to prevent dropdown menu from collapsing
  public onClick = (event: Event) => {
    event.stopPropagation();
  }

}
