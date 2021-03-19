import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-confirm-email-address',
  templateUrl: './confirm-email-address.component.html',
  styleUrls: ['./confirm-email-address.component.scss']
})
export class ConfirmEmailAddressComponent implements OnInit {

  public isConfirmed: boolean;
  public isFailed: boolean;

  constructor(private _authService: AuthenticationService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => { 
    // Initialize properties
    this.isConfirmed = false;
    this.isFailed = false;

    // Retrieve query parameters from route
    const token = this._route.snapshot.queryParams['token'];
    const userId = this._route.snapshot.queryParams['userId'];

    // Call API endpoint to confirm user account
    this._authService.confirmEmail(token, userId)
      .subscribe(_ => {
        this.isConfirmed = true;
      },
      error => {
        this.isFailed = true;
      })
  }
}
